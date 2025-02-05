import { Types } from "mongoose";

export const USER__ROLE = {
    customer:'customer',
    admin:'admin'
} as const

export type ROLE__TYPE = keyof typeof USER__ROLE 


export type reqUserType = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user"; // Adjust roles as needed
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };