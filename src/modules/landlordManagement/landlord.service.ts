import { prisma } from "../../lib/prisma";

const createPropertyIntoDb = async (payload: any, userId: string) => {

    console.log(userId);
    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId: userId
        },
        include: {
            category: true,
            landlord: true
        }
    })

    return property;
}

export const landlordService = {
    createPropertyIntoDb
}