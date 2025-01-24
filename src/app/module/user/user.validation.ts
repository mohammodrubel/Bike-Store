import { z } from "zod";

const userValidation = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
    role:z.string().default("customer")
})

export default userValidation