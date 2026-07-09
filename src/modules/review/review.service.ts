import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReviewIntoDb = async (payload: IReview, tenantId: string) => {

    const completedRental = await prisma.rentalRequest.findFirst({
        where: {
            propertyId: payload.propertyId,
            tenantId: tenantId,
            status: "COMPLETED"
        }
    })

    if (!completedRental) {
        throw new Error("Tenant has not completed a rental for this property, cannot leave a review");
    }

    const existingReview = await prisma.review.findFirst({
        where: {
            propertyId: payload.propertyId,
            tenantId: tenantId
        }
    })

    if (existingReview) {
        throw new Error("Tenant has already left a review for this property");
    }
    const result = await prisma.review.create({

        data: {
            ...payload,
            tenantId
        },
        include: {
            property: true,
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    })
    return result;
}

export const reviewService = {
    createReviewIntoDb
}