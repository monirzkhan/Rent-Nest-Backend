import { prisma } from "../../lib/prisma";

const getAllUsersFromDb = async () => {
    const users = await prisma.user.findMany({
    
    });
    return users;
}

const updateUserStatusInDb = async (userId: string, payload: any) => {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: payload,
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });
    return user;
}

const getAllPropertiesFromDb = async () => {
    const properties = await prisma.property.findMany({
    
    });
    return properties;
}

const getAllRentalRequestsFromDb = async () => {
    const rentalRequests = await prisma.rentalRequest.findMany({
    
    });
    return rentalRequests;
}

export const adminService = {
    getAllUsersFromDb,
    updateUserStatusInDb,
    getAllPropertiesFromDb,
    getAllRentalRequestsFromDb
}