import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message:"we are on"
    })
})

app.listen(process.env.PORT,()=>{
    console.log('server running on port:'+process.env.PORT)
})
