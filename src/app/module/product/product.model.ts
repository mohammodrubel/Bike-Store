import { model, Schema } from "mongoose";
import { Tproduct } from "./product.interface";

export  const productSchema = new Schema<Tproduct>({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    orderQuantity:{
        type:Number,
        default:0
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
  },{
    timestamps:true
  });
  

export const Product = model<Tproduct>('product', productSchema);