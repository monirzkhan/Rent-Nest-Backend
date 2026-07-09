import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "./sendResponse";
import httpStatus from "http-status";

export const catchAsync = (fn: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (error: any) {
            // console.log(error);
            next(error);
        };
    }
}   