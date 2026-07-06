import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app: Application= express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/', (req: Request, res: Response)=>{
    res.send({
        "Application-Name": "RentNest"
    })

})

export default app;