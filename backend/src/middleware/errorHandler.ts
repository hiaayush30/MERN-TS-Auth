import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
       console.log(`PATH:${req.path}`,err);
       res.status(INTERNAL_SERVER_ERROR).json({
        message:'Internal Server Error'
       })
}