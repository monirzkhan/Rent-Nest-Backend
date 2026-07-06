import { prisma } from "../../lib/prisma";

const createUserIntoDb = async (payload: any) => {
    const { name, email, password, role, profilePhoto, bio } = payload;

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });


    if (isUserExists) {
        throw new Error('User already exists');

    }

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            role,
            password,
            profile: {
                create: {
                    profilePhoto,
                    bio
                }
            }

        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return user;
}

export const authService = {
    createUserIntoDb
}