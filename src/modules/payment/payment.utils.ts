import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutComplete = async (session: Stripe.Checkout.Session) => {
    
    const rentalRequestId = session.metadata?.rentalRequestId;
    const propertyId = session.metadata?.propertyId;
    const stripeCustomerId = session.customer as string;
    const transactionId = session.id;
    const amount = session.amount_total != null ? Number(session.amount_total) / 100 : 0;
    const paidAt = session.created ? new Date(session.created * 1000) : new Date();

    if (!rentalRequestId || !stripeCustomerId || !transactionId || !propertyId) {
        console.log("Webhook: Missing values for creating checkout session payment");
        return;
    }

    await prisma.$transaction(async (tx) => {
        await tx.payment.upsert({
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
                paidAt,
            },
            update: {
                rentalRequestId,
                amount,
                method: "ONLINE",
                provider: "STRIPE",
                stripeCustomerId,
                status: "PAID",
                paidAt,
            },
        });

        await tx.rentalRequest.update({
            where: {
                id: rentalRequestId,
            },
            data: {
                status: "COMPLETED",
            },
        });

       
    });

}