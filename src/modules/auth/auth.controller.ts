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

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24  // 1 days
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

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


const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId=req.user?.id;

    const profile= await authService.getMyProfileFromDb(userId as string);
    sendResponse(res,{
        statusCode:HttpStatus.OK,
        success:true,
        message:"User Profile Fetched Successfully",
        data:profile
    })
})

export const authController = {
    createUser,
    loginUser,
    getMyProfile
}