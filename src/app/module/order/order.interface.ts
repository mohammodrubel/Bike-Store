import { Types } from "mongoose"
import { Tproduct } from "../product/product.interface";
export type TshippingInfo= {
    fullName:string;
    phone:string;
    address:string;
    address2:string;
} 

export type Torders = {
    customar:Types.ObjectId,
    products:Tproduct[],
    payment_method: "CASH_ON_DELIVERY"| "SSLCOMMERZ" ;
    transaction_id:string ;
    shippingAddress:TshippingInfo,
    orderQuantity:number;
    total:number ;
    grandTotal:number; 
}

