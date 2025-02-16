import { Types } from "mongoose"

export type TShop = {
    shopName:string;
    websiteLink:string;
    rating:number;
    taxNumber:string ;
    address:string;
    socialMedia:string ;
    logo:string ;
    user:Types.ObjectId;
    serviceOffer:[string]
    isActive:boolean;
    contactNumber:string;
    buisnessLicenseNumber:string
}