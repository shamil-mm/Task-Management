import { Request,Response,NextFunction } from "express";
export class ErrorHandler{
    static handle(err:any,req:Request,res:Response,next:NextFunction){
        const statusCode=err.statusCode || 500
        const message= err.message || "something went wrong";
        res.status(statusCode).json({
            success:false,
            message,
            details:err.details || []
        })
    }
}