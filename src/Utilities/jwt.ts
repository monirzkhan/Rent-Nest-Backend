import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret, {
        expiresIn
    } as SignOptions);
    return token;

}

const verifyToken = (token: string, secret: string) => {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
}


export const jwtUtils = {
    createToken,
    verifyToken
}