import { z } from "zod";

export const rentalZodHouseSchema = z.object({
    body:z.object({
        rental_house_location: z.string().min(1, "Location is required"),
        details_description: z.string().min(10, "Description must be at least 10 characters"),
        rent_amount: z.number().min(0, "Rent amount must be a positive number"),
        number_of_bedrooms: z.number().min(1, "There must be at least one bedroom"),
        landlord:z.string()
    })
});




