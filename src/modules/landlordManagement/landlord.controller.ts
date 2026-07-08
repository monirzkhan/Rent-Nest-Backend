import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from 'http-status'
import { landlordService } from "./landlord.service";

const createProperty =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const id = req.user?.id;

    const result = await landlordService.createPropertyIntoDb(payload, id as string);
    sendResponse(res,{
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Property Created Successfully",
        data: result
    })
    
})



export const landlordController={
    createProperty
} 