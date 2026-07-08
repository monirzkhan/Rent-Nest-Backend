import { prisma } from "../../lib/prisma"

const getAllPropertiesfromDb = async () => {

    const result = await prisma.property.findMany({
        // where: {
        //     AND: {
        //         title: "Villa"

        //     }
        // },
        orderBy:{
            createdAt: "desc"
        },
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true
                }
            }
        }
    })
    return result

}

const getPropertyByIdFromDb = async (propertyId: string) => {
    const result = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId
        },
        include: {
            category: true,
            landlord: {
                omit: {
                    password: true
                }   
            }
        }
    })
    return result;
}




export const propertyService = {
    getAllPropertiesfromDb,
    getPropertyByIdFromDb
}