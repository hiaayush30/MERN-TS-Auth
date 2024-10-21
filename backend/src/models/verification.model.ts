import mongoose from "mongoose";
import { VerificationCodeType } from "../constants/verificationCodeTypes";

interface VerificationDocument extends mongoose.Document{
    userId:mongoose.Types.ObjectId;  //this is the TS type and not the schema type
    type:VerificationCodeType;
    expiresAt:Date;
    createdAt:Date;
}

const verificationSchema=new mongoose.Schema<VerificationDocument>({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
        // is used to create an index on the specified field in the MongoDB database. 
        //Indexes improve the speed of querying a field(userId) by allowing the database to 
        //store a sorted representation of the field, making it faster to search for values
      },
      type:{
        type:String,
        required:true
      },
      createdAt:{
        type:Date,
        required:true,
        default:Date.now
      },
      expiresAt:{
        type:Date,
        required:true
      }
})

const VerificationModel=mongoose.model<VerificationDocument>(
    'verification',
    verificationSchema,
    "verification_codes"
);
// the third argument ("verification_codes") specifies the name of the MongoDB
// collection that this model will be tied to.(this is how it will be created instead
//of verifications)
export default VerificationModel;