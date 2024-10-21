const registerSchema=z.object({
    email:z.string().email().max(255),
    password:z.string().min(6).max(255),
    confirmPassword:z.string().min(6).max(255),
    userAgent:z.string().optional(),
}).refine((data)=>{     //custom validation on the data
    data.password===data.confirmPassword   
},{
    message:"Passwords do not match",
    path:['confirmPassword']
})