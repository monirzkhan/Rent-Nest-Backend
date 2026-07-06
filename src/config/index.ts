import path from "node:path";
import dotenv, { config } from "dotenv";

dotenv.config({
path:path.join(process.cwd(), '.env')
})


export default{
    path: process.env.PORT,
    dataBaseUrl: process.env.DATABASE_URL

}


