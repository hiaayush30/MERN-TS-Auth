import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>
}
//mongoose.document already contains properties like _id and methods like save(),
// populate() etc

const userSchema = new mongoose.Schema<UserDocument>({
    //here UserDocemnet tells TS what types of the properties should be
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

//on user schema we can define hooks which will run before the events occur
userSchema.pre('save',async function(next){
    if(!this.isModified(this.password)){
        //if the password has not been modified
        //no need to run the hash function
        next();
    }
    this.password=await hashValue(this.password)
    next();
})

userSchema.methods.comparePassword=async function(val:string){
    return await compareValue(val,this.password)
}

const UserModel=mongoose.model<UserDocument>('User',userSchema);
// here userDocument ensures that the documents created from the schema have the same
// structure as the UserDocument interface and gives TypeScript type safety when 
// interacting with the model.
export default UserModel;