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

const getAllProperties = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await landlordService.getAllPropertiesFromDb();
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Properties Fetched Successfully",
        data: result
    })
})  

const getPropertyById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const propertyId = req.params.id;
    const result = await landlordService.getPropertyByIdFromDb(propertyId as string);
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Property Fetched Successfully",
        data: result
    })
})

const UpdateProperty = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const propertyId = req.params.id;
    const payload = req.body;
    const result = await landlordService.updatePropertyInDb(propertyId as string, payload);
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Property Updated Successfully",
        data: result
    })
})

const DeleteProperty = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{     
    const propertyId = req.params.id;
    const result = await landlordService.DeletePropertyFromDb(propertyId as string);
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Property Deleted Successfully",
        data:  null
    })
})

const getAllRentalRequests = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const landlordId = req.user?.id;
    if(!landlordId){
        return next(new Error("Landlord ID is missing in the request"));
    }
    const result = await landlordService.getAllRentalRequestsFromDb(landlordId as string);
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Rental Requests Fetched Successfully",
        data: result
    })
})

const updateRentalRequestById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const rentalRequestId = req.params.id;
    
    const payload = req.body;
    
    const result = await landlordService.updateRentalRequestByIdInDb(rentalRequestId as string, payload);
    sendResponse(res,{
        statusCode: HttpStatus.OK,
        success: true,
        message: "Rental Request Updated Successfully",
        data: result
    })
})


export const landlordController={
    createProperty,
    getAllProperties,
    getPropertyById,
    UpdateProperty,
    DeleteProperty,
    getAllRentalRequests,
    updateRentalRequestById
} 
 