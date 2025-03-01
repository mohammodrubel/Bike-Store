
export type TUser = {
    name:string;
    email:string;
    password:string;
    role:"Landlord" | "Admin" | "Tenant";
    isBlocked:boolean
}



