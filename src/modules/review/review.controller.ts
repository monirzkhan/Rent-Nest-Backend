import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from 'http-status'
import { reviewService } from "./review.service";

const createReview = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const tenantId = req.user?.id;
    if(!tenantId){
        return next(new Error("Tenant ID is missing in the request"));
    }

    const result = await reviewService.createReviewIntoDb(payload, tenantId as string);
    sendResponse(res,{
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Review Created Successfully",
        data: result
    })
})

export const reviewController = {
    createReview
}