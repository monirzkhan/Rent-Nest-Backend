import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createPaymentIntoDb = async (tenantId: string, rentalRequestId: string) => {
    const tranasctionalResult = await prisma.$transaction(async (tx) => {
        const rentalRequest = await tx.rentalRequest.findFirstOrThrow({
            where: {
                id: rentalRequestId,
                tenantId,
            },
            include: {
                payment: true,
                tenant: true,
                property: true,
            },
        });


        let stripeCustomerId = rentalRequest.payment?.stripeCustomerId;

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: rentalRequest.tenant.email,
                name: rentalRequest.tenant.name,
                metadata: { userId: rentalRequest.tenant.id },
            });

            stripeCustomerId = customer.id;
        }

        // return { rentalRequestId, stripeCustomerId };

        const totalAmount = Number(rentalRequest.property.rentAmount) * Number(rentalRequest.durationMonths);
        // console.log(totalAmount);
        const session = await stripe.checkout.sessions.create({

            line_items: [
                {

                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: rentalRequest.property.title
                        },
                        unit_amount: Math.round(totalAmount * 100)// Convert to cents
                    },
                    quantity: 1

                }
            ],
            mode: "payment",
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.app_url}/payment/cancel`,
            metadata: {
                userId: tenantId,
                rentalRequestId,
                propertyId: rentalRequest.property.id,
            },

        })
        return session.url
    });
    return {
        paymentURL: tranasctionalResult
    }
};

const handleWebhook = async (payload: Buffer, signature: string) => {
    const endpointSecret = config.stripeWebhookEndpointSecret
    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
    );


    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            //Occurs when a Checkout Session has been successfully completed.
            const session: Stripe.Checkout.Session = event.data.object;
            const rentalRequestId = session.metadata?.rentalRequestId;
            const stripeCustomerId = session.customer as string;
            const transactionId = session.id;
            const amount = session.amount_total != null ? Number(session.amount_total) / 100 : 0;
            const paidAt= session;
            console.log(session);

            if (!rentalRequestId || !stripeCustomerId || !transactionId) {
                console.log("Webhook: Missing values for creating checkout session payment");
                return;
            }

            await prisma.payment.upsert({
                where: {
                    transactionId,
                },
                create: {
                    transactionId,
                    rentalRequestId,
                    amount,
                    method: "ONLINE",
                    provider: "STRIPE",
                    stripeCustomerId,
                    status: "PAID",
                },
                update: {
                    rentalRequestId,
                    amount,
                    method: "ONLINE",
                    provider: "STRIPE",
                    stripeCustomerId,
                    status: "PAID",
                },
            });
            break;
        case 'payment_intent.succeeded':
            //Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).
            // await handleChangeSubscription(event.data.object)
            break;

        /*
        To test this run this command in terminal 
        stripe subscriptions cancel sub_1PsYourSubIdHere (paste existinmg subscribed sub id)
        */

        case 'customer.subscription.deleted':
            //Occurs whenever a customer’s subscription ends
            // await handleChangeSubscription(event.data.object)
            break;

        /*
       To test this run this command in terminal 
       stripe subscriptions cancel sub_1PsYourSubIdHere (paste existinmg subscribed sub id)
       */

        default:
            // Unexpected event type
            console.log(`No events matched. Unhandled event type ${event.type}.`);
            break;
    }
}

export const paymentService = {
    createPaymentIntoDb,
    handleWebhook
};