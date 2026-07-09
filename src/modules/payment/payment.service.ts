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
                        currency: "BDT",
                        product_data: {
                            name: rentalRequest.property.title
                        },
                        unit_amount: totalAmount * 100// Convert to cents
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

export const paymentService = {
    createPaymentIntoDb,
};