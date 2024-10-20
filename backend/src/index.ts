import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
const app = express();

import { connectToDatabase } from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import { catchErrors } from './utils/catchErrors';
import { OK } from './constants/http';
connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,  //only this url can access our api
    credentials: true
    //The server accepts requests that include credentials
    // (like cookies or HTTP authentication) from the frontend.
    // it sets the Access-Control-Allow-Credentials HTTP header to true indicating to the
    // browser that the server allows credentials to be included in cross-origin reqs.
}));
app.use(cookieParser())

// app.get('/health',async (req,res,next)=>{  
// throw new Error('wassup')
// The throw inside the async function creates a rejected promise.
// Express does not automatically catch the rejected promise (unlike synchronous errors).
//   so we have to wrap it in a try-catch block
//     try{
//         throw new Error('wassup');
//         res.json({
//             message:"we are on"
//         })
//     }catch(err){
//         next(err);
//     }
// })

//using a utility function
app.get('/health', catchErrors(async (req, res, next) => {
    // throw new Error('wassup');
    res.status(OK).json({
        message: "we are on"
    })
}))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server running on port:' + PORT + ` in ${NODE_ENV} environment`)
})
