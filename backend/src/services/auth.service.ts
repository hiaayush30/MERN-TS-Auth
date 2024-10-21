export type createAccountParams={
    email:string;
    password:string;
    userAgent?:string
}

export const createAccount=async(data:createAccountParams)=>{
     //verify user does not already exist
     //create user
     //create verification code
     //send verification email
     //create session
     //sign access token and refresh token
     //return user and tokens
}