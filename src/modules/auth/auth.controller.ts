import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../Utilities/sendResponse";
import  HttpStatus  from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await authService.createUserIntoDb(payload);

    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "User is Created Successfully",
        data: result
    })
}
const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await authService.createUserIntoDb(payload);

    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "User is Created Successfully",
        data: result
    })
}

export const authController = {
    createUser,
    loginUser,
}