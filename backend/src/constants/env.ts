const getEnv=(key:string,defaultVal?:string):string=>{
    const value=process.env[key] || defaultVal
    if (value==undefined) throw new Error(`Missing Environment variable ${key}`)
    return value    
}
//helps fix the TS problem of 'value can be string or undefined and only string accepted' 

export const PORT=getEnv('PORT','4004')
export const MONGO_URI=getEnv("MONGO_URI")
export const NODE_ENV=getEnv('NODE_ENV','development')
export const JWT_SECRET=getEnv('JWT_SECRET')
export const JWT_REFRESH_SECRET=getEnv('JWT_REFRESH_SECRET')
export const APP_ORIGIN=getEnv('APP_ORIGIN')
export const EMAIL_SENDER=getEnv('EMAIL_SENDER')
export const RESEND_API_KEY=getEnv('RESEND_API_KEY')
