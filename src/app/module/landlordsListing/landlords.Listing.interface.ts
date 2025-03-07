// Requests Collection (Rental Requests):
//product landloard listing
import { Types } from "mongoose"

export type TLandlords = {
    rental_house_location:string,
    details_description:string,
    rent_amount:number,
    number_of_bedrooms:number,
    multiple_images:[string],
    landlord:Types.ObjectId,
    amenities:string
}