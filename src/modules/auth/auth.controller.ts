import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body
    const result = await authService.createUserIntoDb(payload);

    res.status(200).json({
        message: "User Created Successfully",
        date: {result}
    })


}

export const authController = {
    createUser
}