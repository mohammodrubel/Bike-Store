// rental house location, details description, rent amount, number of bedrooms, multiple images, landlord ID

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
