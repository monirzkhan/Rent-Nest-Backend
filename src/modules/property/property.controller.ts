import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from "http-status";
import { propertyService } from "./property.service";

const getAllProperties = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyService.getAllPropertiesfromDb();
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Properties Fetched Successfully",
        data: result
    })

}))

const getPropertyById = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const result = await propertyService.getPropertyByIdFromDb(propertyId as string);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Property Fetched Successfully",
        data: result
    })

}))




export const propertyController = {
    getAllProperties,
    getPropertyById
}