import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { landlordRoutes } from "./modules/landlordManagement/landlord.routes";
import { categoryRoutes } from "./modules/category/category.routes";


const app: Application= express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/', (req: Request, res: Response)=>{
    res.send({
        "Application_Name": "RentNest",
        "version": "1.0.0",
        "Author": "Md. Moniruzzaman",
        "E-mail": "mmonirz.dev@gmail.com"
    })

})

app.use('/api/auth/', authRoutes)
app.use('/api/landlord/', landlordRoutes)
app.use('/api/categories/', categoryRoutes)

export default app;