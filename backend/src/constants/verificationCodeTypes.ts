export const enum VerificationCodeType{
    EmailVerifcation='email_verification',
    PasswordReset='password_reset'
}

//using const enum instead of enum
//this will directly inject the values in the compiled js code wherever 
//used instead of creating an object of these keys and values
//which are referenced