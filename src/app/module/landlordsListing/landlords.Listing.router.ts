import { NextFunction, Request, Response, Router } from "express";
import DataValidation from "../../../middleware/dataValidation";
import { upload } from "../../../middleware/SendToCloudinary";
import { rentalZodHouseSchema } from "./landlords.Listing.validation";
import { landlordsListingController } from "./landlords.Listing.controller";

const router = Router()


router.post('/listings',
    upload.array('file', 3),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    DataValidation(rentalZodHouseSchema),
    landlordsListingController.createlandlordsListingController)

router.get(`/listings/:id`,landlordsListingController.getSinglelandlordsListingController)
router.get('/listings', landlordsListingController.getAlllandlordsListingController)
router.put('/listings', landlordsListingController.updateSinglelandlordsListingController)



export const landlordsListingRouter = router 
