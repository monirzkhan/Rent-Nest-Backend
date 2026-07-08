import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utilities/catchAsync";
import { sendResponse } from "../../Utilities/sendResponse";
import HttpStatus from 'http-status'
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    

    const result= await categoryService.createCategoryIntoDb(payload);

     sendResponse(res,{
        statusCode:HttpStatus.CREATED,
        success:true,
        message:"Category Created Successfully",
        data:result
    })
})

const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result= await categoryService.getCategoriesFromDb();

     sendResponse(res,{
        statusCode:HttpStatus.OK,
        success:true,
        message:"Categories Fetched Successfully",
        data:result
    })
}   )


export const categoryController = {
    createCategory,
    getCategories
}