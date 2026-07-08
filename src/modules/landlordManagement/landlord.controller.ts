import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";

const createProperty =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    
})



export const landlordController={
    createProperty
} 