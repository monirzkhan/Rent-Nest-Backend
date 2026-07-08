import { skip } from "node:test";
import { prisma } from "../../lib/prisma"
import { IPropertyQuery } from "./property.interface"

const getAllPropertiesfromDb = async (query: IPropertyQuery) => {

    const limit = query.limit ? Number(query.limit) : 5;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const andConditions: IPropertyQuery[] = [];
    if (query.searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    address: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
            ]
        })
    }
    
    if (query.title) {
        andConditions.push({ title: query.title })
    }   
    if (query.description) {
        andConditions.push({ description: query.description })
    }
    if (query.address) {
        andConditions.push({ address: query.address })
    }
    if (query.rentAmount) {
        andConditions.push({ rentAmount: query.rentAmount })
    }
    if (query.status) {
        andConditions.push({ status: query.status })
    } 
    if (query.bedrooms) {
        andConditions.push({ bedrooms: query.bedrooms })
    }
    if (query.bathrooms) {
        andConditions.push({ bathrooms: query.bathrooms })
    }
    if (query.areas) {
        andConditions.push({ areas: query.areas })
    }
    if (query.categoryId) {
        andConditions.push({ categoryId: query.categoryId })
    } 
    if (query.landlordId) {
        andConditions.push({ landlordId: query.landlordId })
    }    
    
    const result = await prisma.property.findMany({
        // where: {
        //     AND: [
        //         query.searchTerm ? {
        //             OR: [
        //                 {
        //                     title: {
        //                         contains: query.searchTerm,
        //                         mode: "insensitive"
        //                     }
        //                 },
        //                 {
        //                     description: {
        //                         contains: query.searchTerm,
        //                         mode: "insensitive"
        //                     }
        //                 },

        //                 {
        //                     address: {
        //                         contains: query.searchTerm,
        //                         mode: "insensitive"
        //                     }
        //                 },
                      

        //             ]
        //         } : {},


        //         query.title ? { title: query.title } : {},
        //         query.description ? { description: query.description } : {},
        //         query.address ? { address: query.address } : {},
        //         query.rentAmount ? { rentAmount: query.rentAmount } : {},
        //         query.status ? { status: query.status } : {}
        //     ]

        // },
        where: {
            AND: andConditions
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
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