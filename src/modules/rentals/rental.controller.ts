import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import HttpStatus from "http-status";
import { sendResponse } from "../../Utilities/sendResponse";
import { rentalService } from "./rental.service";

const createRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;
    const tenantId = req.user?.id;
    // console.log(tenantId);
    if (!tenantId) {
        return next(new Error("Tenant ID is missing in the request"));
    }

    const result = await rentalService.createRentalRequestIntoDb(payload, tenantId as string);
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Rental Request Created Successfully",
        data: result
    })
})

const getAllRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user?.id;
    if (!tenantId) {
        return next(new Error("Tenant ID is missing in the request"));
    }

    const result = await rentalService.getAllRentalRequestsFromDb(tenantId as string);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Rental Requests Retrieved Successfully",
        data: result
    })
})

const getRentalRequestById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rentalRequestId = req.params.id;
    const tenantId = req.user?.id;
    if (!tenantId) {
        return next(new Error("Tenant ID is missing in the request"));
    }

    const result = await rentalService.getRentalRequestByIdFromDb(rentalRequestId as string, tenantId as string);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Rental Request Retrieved Successfully",
        data: result
    })
})

export const rentalController = {
    createRentalRequest,
    getAllRentalRequests,
    getRentalRequestById
}