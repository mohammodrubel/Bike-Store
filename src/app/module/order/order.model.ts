import { model, Schema } from "mongoose";
import { Torders } from "./order.interface";

const orderSchema = new Schema<Torders>({
    email:{
        type:String,
        required:true
    },  
    product:{
        type:Schema.Types.ObjectId,
        ref:'Bike'
    },  
    quantity:{
        type:Number,
        required:true
    },  
    totalPrice:{
        type:Number,
        required:true
    },  
},{
    timestamps:true
})

export const Order = model<Torders>('order', orderSchema)