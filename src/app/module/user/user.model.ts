import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'


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
        default:'user'
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false 
    }
},{
    timestamps:true
});

userSchema.pre('save', async function(next) {
    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashPassword;
    next();
  });

export const User = model<TUser>('User', userSchema);
