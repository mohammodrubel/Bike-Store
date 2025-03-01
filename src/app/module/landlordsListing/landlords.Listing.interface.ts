import { Types } from "mongoose"
export type TLandlordsRequest = {
    rental_house_listing_ID:Types.ObjectId,
    tenant_ID:Types.ObjectId,
    status:"pending" | "approved" | "rejected",
    landlord_phone_number:string, 
    payment_status:'PENDING'| 'PAID'| 'FAILED'| 'CANCELLED',
    tenant_message:string,

}