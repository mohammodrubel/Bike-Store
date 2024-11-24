import { Types } from "mongoose"

export type Torders = {
    email:string
    product:Types.ObjectId
    quantity:number 
    totalPrice:number
}