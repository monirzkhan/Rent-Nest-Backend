import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from "http-status";
import { adminService } from "./admin.service";

const getAllUsers = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await adminService.getAllUsersFromDb();
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Users Fetched Successfully",
        data: result
    })
}))

const updateUserStatus = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;
    const result = await adminService.updateUserStatusInDb(userId as string, payload);
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "User Status Updated Successfully",
        data: result
    })
}))    

const getAllProperties = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllPropertiesFromDb();
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Properties Fetched Successfully",
        data: result
    })
}))

const getAllRentalRequests = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await adminService.getAllRentalRequestsFromDb();
    sendResponse(res, {
        statusCode: HttpStatus.OK,
        success: true,
        message: "Rental Requests Fetched Successfully",
        data: result
    })
}))

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
}

