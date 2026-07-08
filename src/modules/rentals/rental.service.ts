import { prisma } from "../../lib/prisma";
import { IRentalRequest } from "./rental.interface"

const createRentalRequestIntoDb = async (payload: IRentalRequest, tenantId: string) => {

    const result = await prisma.rentalRequest.create({
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

const getAllRentalRequestsFromDb = async (tenantId: string) => {
    const result = await prisma.rentalRequest.findMany({
        where: {
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

const getRentalRequestByIdFromDb = async (rentalRequestId: string, tenantId: string) => {
    const result = await prisma.rentalRequest.findFirst({
        where: {
            id: rentalRequestId,
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
export const rentalService = {
    createRentalRequestIntoDb,
    getAllRentalRequestsFromDb,
    getRentalRequestByIdFromDb
} 