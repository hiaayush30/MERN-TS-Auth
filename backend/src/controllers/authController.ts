import { CREATED, OK } from "../constants/http";
import { createAccount, loginUser } from "../services/auth.service";
import { catchErrors } from "../utils/catchErrors";
import {z} from 'zod'
import { setAuthCookies } from "../utils/cookies";

const loginSchema=z.object({
    email:z.string().email().max(255),
    password:z.string().min(6).max(255),
    userAgent:z.string().optional(),
})

const registerSchema=loginSchema.extend({
    confirmPassword:z.string().min(6).max(255),
})
.refine((data)=>{     //custom validation on the data
    return data.password===data.confirmPassword   
},{
    message:"Passwords do not match",
    path:['confirmPassword']
})

export const registerHandler=catchErrors(async (req,res,next)=>{
        const request=registerSchema.parse({
           ...req.body,
           userAgent:req.headers["user-agent"]
        })
        const {user,accessToken,refreshToken} =await createAccount(request);
        return setAuthCookies({res,accessToken,refreshToken})
        .status(CREATED)
        .json(user)  
})

export const loginHandler=catchErrors(async(req,res,next)=>{
    const request=loginSchema.parse({
        ...req.body,
        userAgent:req.headers['user-agent']
    });
    const {accessToken,refreshToken}=await loginUser(request)
    return setAuthCookies({res,accessToken,refreshToken}).status(OK).json({
        message:'login successfull!'
    })
})