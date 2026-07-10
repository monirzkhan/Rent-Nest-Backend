import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handleCheckoutComplete } from "./payment.utils";
import HttpStatus from "http-status";

const createPaymentIntoDb = async (tenantId: string, rentalRequestId: string) => {
    const tranasctionalResult = await prisma.$transaction(async (tx) => {
        const rentalRequest = await tx.rentalRequest.findFirstOrThrow({
            where: {
                id: rentalRequestId,
                tenantId,
                status: "APPROVED"
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
                metadata: {
                    userId: rentalRequest.tenant.id,
                    propertyId: rentalRequest.propertyId

                },
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
            handleCheckoutComplete(event.data.object)

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

const confirmPaymentIntoDb = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
        throw new Error(`${HttpStatus.BAD_REQUEST}, "Payment not completed"`);
    }

    const rentalRequestId = session.metadata?.rentalRequestId;
    const propertyId = session.metadata?.propertyId
    const stripeCustomerId = session.customer as string;

    if (!rentalRequestId) {
        throw new Error("Rental Request ID not found");
    }

    const amount = Number(session.amount_total) / 100;

    const paidAt = new Date(session.created * 1000);

    const PaymentDetails = await prisma.$transaction(async (tx) => {

        const updatedPaymentDetails = await tx.payment.upsert({

            where: {
                transactionId: session.id
            },

            create: {

                transactionId: session.id,
                rentalRequestId,
                amount,
                method: "ONLINE",
                provider: "STRIPE",
                stripeCustomerId,
                status: "PAID",
                paidAt,

            },

            update: {

                status: "PAID",
                paidAt,

            }

        });

        const updatedRentalRequest = await tx.rentalRequest.update({

            where: {
                id: rentalRequestId
            },

            data: {
                status: "COMPLETED"
            }

        });
        const updatedPropertyStatus = await tx.property.update({
            where: {
                id: propertyId
            },
            data: {
                status: "RENTED"
            }
        })
        return {
            updatedPaymentDetails,
            updatedRentalRequest,
            updatedPropertyStatus
        }

    });

    return {
        PaidPropertyDetails: PaymentDetails
    }

}

const getPaymentHistoryfromDb = async (userId: string) => {
    const result = await prisma.payment.findMany({
        include:{
            rentalRequest: true
        }
    })
    return result

}
const getPaymentHistoryByIdfromDb = async (paymentId: string) => {
    const result = await prisma.payment.findFirstOrThrow({
        where:{
            id: paymentId,
            
        },
        include:{
            rentalRequest:true,
            
        }
    })
    return result

}

export const paymentService = {
    createPaymentIntoDb,
    handleWebhook,
    confirmPaymentIntoDb,
    getPaymentHistoryfromDb,
    getPaymentHistoryByIdfromDb
};