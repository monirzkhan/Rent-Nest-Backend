import config from "../../config";
import { prisma } from "../../lib/prisma";
import { IUser } from "./auth.interface";
import bcrypt from 'bcrypt'

const createUserIntoDb = async (payload: IUser) => {
    const { name, email, password, role, profilePhoto, bio } = payload;

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });


    if (isUserExists) {
        throw new Error('User already exists');

    }

    const hashPassword= await bcrypt.hash(password, Number(config.bcryptSaltRounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            role,
            password: hashPassword,
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