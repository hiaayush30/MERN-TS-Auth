import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.service";
import { catchErrors } from "../utils/catchErrors";
import {z} from 'zod'
import { setAuthCookies } from "../utils/cookies";

const registerSchema=z.object({
    email:z.string().email().max(255),
    password:z.string().min(6).max(255),
    confirmPassword:z.string().min(6).max(255),
    userAgent:z.string().optional(),
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
        setAuthCookies({res,accessToken,refreshToken})
        .status(CREATED)
        .json(user)  
})