//a utility function in order to avoid writing try-catch blocks for 
//each async request handler

import { NextFunction, Request, Response } from "express"

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

export const catchErrors = (controller: AsyncController): AsyncController => {
    return async (req, res, next) => {  //will be provided by express
        try {
            await controller(req, res, next)
            //if promise rejects(error thrown) catch block will handle it 
            //else nothing will happen
        } catch (err) { 
            next(err)
        }
    }
}