import { NextFunction, Request, Response } from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: `Route ${req.originalUrl} Not Found`,
        date: Date()
    })
}