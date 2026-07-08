import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from "http-status";
import { catchAsync } from "../../Utilities/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await authService.createUserIntoDb(payload);

    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "User is Created Successfully",
        data: result
    })
})
const loginUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {

    try {

        const payload = req.body
        const {refreshToken, accessToken} = await authService.loginUserFromDb(payload);

        sendResponse(res, {
            statusCode: HttpStatus.OK,
            success: true,
            message: "User is Logged In Successfully",
            data: {accessToken, refreshToken }
        })
    } catch (error:any) {
        console.log(error);
        sendResponse(res, {
            statusCode: HttpStatus.UNAUTHORIZED,
            success: false,
            message: error.message,
            data: null
        })

    }
})

export const authController = {
    createUser,
    loginUser,
}