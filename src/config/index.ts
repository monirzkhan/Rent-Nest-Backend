import path from "node:path";
import dotenv, { config } from "dotenv";

dotenv.config({
path:path.join(process.cwd(), '.env')
})


export default{
    path: process.env.PORT,
    dataBaseUrl: process.env.DATABASE_URL,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS!,
    jwtAccessSecret:process.env.JWT_ACCESS_SECRET!,
    jwtAccessExpireIn:process.env.JWT_ACCESS_EXPIRE_IN!,
    jwtRefreshSecret:process.env.JWT_REFRESH_SECRET!,
    jwtRefreshExpireIn:process.env.JWT_REFRESH_EXPIRE_IN!,

}


