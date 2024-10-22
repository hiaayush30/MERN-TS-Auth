import { ErrorRequestHandler,Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import {z, ZodError} from 'zod';
import AppError from "../utils/AppError";

const handleZodZError=(res:Response,err:z.ZodError)=>{
       const errors=err.issues.map(err=>({
             path:err.path.join('.'),
             message:err.message
       }))
     res.status(BAD_REQUEST).json({
       message:err.message,
       errors
     })
}

export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
       if(err instanceof z.ZodError){
              return handleZodZError(res,err);
       }

       if(err instanceof AppError){
              res.status(err.statusCode).json({
                     message:err.message
              })
       }

       console.log(`PATH:${req.path}`,err);
       res.status(INTERNAL_SERVER_ERROR).json({
        message:'Internal Server Error',
       })
}