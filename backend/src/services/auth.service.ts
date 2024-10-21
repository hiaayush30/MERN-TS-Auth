import UserModel from "../models/user.model";

export type createAccountParams={
    email:string;
    password:string;
    userAgent?:string
}

export const createAccount=async(data:createAccountParams)=>{
    //send verification email
    //create session
    //sign access token and refresh token
    //return user and tokens
    //verify user does not already exist
    const existingUser=await UserModel.find({
        email:data.email
    });
    if(existingUser) throw new Error('user already exists!')
    //create user
        const user=await UserModel.create({
           email:data.email,
           password:data.password    
        })
    //create verification code    
}