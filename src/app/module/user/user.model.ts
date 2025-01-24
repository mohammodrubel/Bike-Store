import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique:true ,
        trim:true
    },
    password: {
        type: String,
        required: true 
    },
    role:{
        type:String,
        required:true ,
        default:'customer'
    }
});

export const User = model<TUser>('User', userSchema);
