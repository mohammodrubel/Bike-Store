import { z } from "zod";
import productValidation from "../product/product.validation";
export const shippingAddressSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  address2: z.string().optional(),
});
export const orderSchemaValidation = z.object({
  body: z.object({
    customar: z.string(),  
    products: z.array(
      productValidation
    ),
    payment_method: z.enum(["CASH_ON_DELIVERY", "SSLCOMMERZ"]).default("CASH_ON_DELIVERY"),
    shippingAddress: shippingAddressSchema,
    total:z.number(),
    grandTotal:z.number()
  }),
});


