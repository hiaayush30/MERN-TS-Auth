import mongoose, { MongooseError } from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectToDatabase = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('database connected');
    }catch(err){
        console.log('mongodb error:'+err);
        process.exit(1);
    }
}

// In Node.js, process.exit() is a method used to terminate a running process.
// It takes an exit code as an argument, which indicates whether the process exited
// successfully or encountered an error.
// exit code 1 shows that the process is exiting due to an error or abnormal condition.