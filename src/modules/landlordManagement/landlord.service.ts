import { prisma } from "../../lib/prisma";
import { ICreateProperty, IUpdateProperty } from "./landlord.interface";

const createPropertyIntoDb = async (payload: ICreateProperty, userId: string) => {

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

const getAllPropertiesFromDb = async () => {
    const properties = await prisma.property.findMany({
        include: {
            category: true,
            landlord: true
        },
    });
    return properties;
}

const getPropertyByIdFromDb = async (propertyId: string) => {
    const property = await prisma.property.findUnique({
        where: {
            id: propertyId
        },
        include: {
            category: true,
            landlord: true
        }
    });
    return property;
}

const updatePropertyInDb = async (propertyId: string, payload: IUpdateProperty) => {
    const property = await prisma.property.update({
        where: {
            id: propertyId
        },
        data: {
            ...payload
        },
        include: {
            category: true,
            landlord: true
        }
    });
    return property;
}

const DeletePropertyFromDb = async (propertyId: string) => {
    const property = await prisma.property.delete({
        where: {
            id: propertyId
        },
        include: {
            category: true,
            landlord: true
        }
    });
    return property;
}

const getAllRentalRequestsFromDb = async (landlordId: string) => {
    const rentalRequests = await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId: landlordId
            }
        },
        include: {
            property: true,
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    });
    return rentalRequests;
}   

const updateRentalRequestByIdInDb = async (rentalRequestId: string, payload: any) => {
    const rentalRequest = await prisma.rentalRequest.update({
        where: {
            id: rentalRequestId
        },
        data: {
            ...payload
        },
        include: {
            property: true,
            tenant: {
                omit: {
                    password: true
                }
            }
        }
    });
    return rentalRequest;
}         

export const landlordService = {
    createPropertyIntoDb,
    getAllPropertiesFromDb,
    getPropertyByIdFromDb,
    updatePropertyInDb,
    DeletePropertyFromDb,
    getAllRentalRequestsFromDb,
    updateRentalRequestByIdInDb
}

   
