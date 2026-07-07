import { Role } from "../../../generated/prisma/enums"

export interface IUser {
    name: string;
    email: string;
    password: string;
    profilePhoto?: string;
    bio: string,
    role: Role
}

export interface IUserLogin {
    email: string;
    password: string
}