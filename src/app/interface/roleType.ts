import { Types } from "mongoose";

export const USER__ROLE = {
    Landlord:"Landlord" ,
    Admin:"Admin" ,
    Tenant:"Tenant"
} as const

export type ROLE__TYPE = keyof typeof USER__ROLE 


export type reqUserType = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "Landlord" | "Admin" | "Tenant"; 
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };