import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

interface SessionDocument extends mongoose.Document{
   userId:mongoose.Types.ObjectId;
   userAgent?:string
   //this will be helpful bcz when user signs in it will help us no the device (ios or
   //android or mac) and help them know that the session is theirs or not
   createdAt:Date;
   expiresAt:Date;
}

const sessionSchema=new mongoose.Schema<SessionDocument>({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    index:true
  },
  userAgent:{
    type:String
  },
  expiresAt:{
    type:Date,
    default:thirtyDaysFromNow
  }
},{timestamps:true})

const SessionModel=mongoose.model<SessionDocument>('session',sessionSchema);
export default SessionModel