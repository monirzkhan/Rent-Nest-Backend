import { sendResponse } from "../../Utilities/sendResponse";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import HttpStatus from "http-status";
import { paymentService } from "./payment.service";


const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const tenantId = req.user?.id;
    const rentalRequestId = req.body.rentalRequestId;
    console.log(rentalRequestId);
    if (!tenantId) {
        return next(new Error("Tenant ID is missing in the request"));
    }

    const result = await paymentService.createPaymentIntoDb(tenantId as string, rentalRequestId as string);
    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Payment Created Successfully",
        data: result
    })
})


const handleWebhook = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const event = req.body as Buffer;
        const signature = req.headers['stripe-signature']!;

        await paymentService.handleWebhook(event, signature as string)

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Webhook triggered successfully",
            data: null
        })
    }
)

const confirmPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const sessionId = req.body.sessionId
    const result = await paymentService.confirmPaymentIntoDb(sessionId as string)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment Confirmed successfully",
        data: result
    })

})

const getPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const result = await paymentService.getPaymentHistoryfromDb(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Payment History Retrived successfully",
        data: result
    })
})
const getPaymentHistoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const paymentId = req.params.id

    const result = await paymentService.getPaymentHistoryByIdfromDb(paymentId as string)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Payment History Retrived successfully",
        data: result
    })
})
export const paymentsController = {
    createPayment,
    handleWebhook,
    confirmPayment,
    getPaymentHistory,
    getPaymentHistoryById
}