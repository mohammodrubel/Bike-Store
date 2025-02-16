
export type TUser = {
    name:string;
    email:string;
    password:string;
    role:"customer" | "admin" | "user";
    isBlocked:boolean
}



