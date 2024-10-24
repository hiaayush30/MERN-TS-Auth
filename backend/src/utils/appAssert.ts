import assert from'node:assert'
import AppError from './AppError'
import { httpStatusCode } from '../constants/http'
import { AppErrorCode } from '../constants/appErrorCode'

// Asserts a condition and throws an AppError if the condition is falsy

type AppAssert=(
    condition:any,
    httpStatusCode:httpStatusCode,
    message:string,
    appErrorCode?:AppErrorCode
)=> asserts condition
// asserts is a TS-specific keyword that is used to tell the compiler that a function will perform
// an assertion. If the function is called and completes without throwing an error, TS understands
// that the specified condition is guaranteed to be true afterward.

// This allows the rest of the code that follows the assertion to assume that the condition is truthy,
// which helps with type inference.

// assert: This is a Node.js module used to throw an error if a given condition is not truthy.

const appAssert:AppAssert=(
    condition:any,
    httpStatusCode,
    message,
    appErrorCode
)=>{
    return assert(condition,new AppError(httpStatusCode,message,appErrorCode))
    //if condition is falsy the AppError will be called
}

export default appAssert