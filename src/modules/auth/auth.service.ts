import { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../Utilities/jwt";
import { IUser, IUserLogin } from "./auth.interface";
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

    const hashPassword = await bcrypt.hash(password, Number(config.bcryptSaltRounds));

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
const loginUserFromDb = async (payload: IUserLogin
) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },


    })

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // console.log(user.password);

    if (!isPasswordMatched) {
        throw new Error('Invalid Credentials');
    }

    const jwtPayload = {
        name: user.name,
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwtAccessSecret, config.jwtAccessExpireIn as SignOptions)

    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwtRefreshSecret, config.jwtRefreshExpireIn as SignOptions)

    return { accessToken, refreshToken };
}

const getMyProfileFromDb = async (userId: string) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: userId
        },
        include: {
            profile: true
        },
        omit: {  
            password: true
        }   
    })


    return user;
}


export const authService = {
    createUserIntoDb,
    loginUserFromDb,
    getMyProfileFromDb
}