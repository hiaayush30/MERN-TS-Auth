import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { VerificationCodeType } from "../constants/verificationCodeTypes";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationModel from "../models/verification.model";
import { oneYearFromNow } from "../utils/date";
import jwt from 'jsonwebtoken'

export type createAccountParams = {
    email: string;
    password: string;
    userAgent?: string
}

export const createAccount = async (data: createAccountParams) => {
    //verify user does not already exist
    const existingUser = await UserModel.find({
        email: data.email
    });
    if (existingUser) throw new Error('user already exists!')
    //create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password
    })
    //create verification code    
    const verificationCode = await VerificationModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerifcation,
        expiresAt: oneYearFromNow()  //returns an instance of date class
    })
    //send verification email
    //create session - a unit of time user is logged in for
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent
    })
    //sign access token and refresh token
    const refreshToken = jwt.sign({
        sessionId: session._id
    }, JWT_REFRESH_SECRET, {
        expiresIn: '30d',
        audience: ['user']  //defines who the jwt is being assigned to
        //it can be user,admin etc
    })

    const accessToken = jwt.sign({
        sessionId: session._id,
        userId: user._id
    }, JWT_SECRET, {
        expiresIn: '15m',
        audience: ['user']
    })
    //return user and tokens
    return {
        user,accessToken,refreshToken
    }
}
