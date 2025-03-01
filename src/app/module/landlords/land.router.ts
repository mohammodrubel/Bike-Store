import { NextFunction, Request, Response, Router } from "express";
import { LandController } from "./land.controller";
import { rentalZodHouseSchema } from "./land.zodValidation";
import DataValidation from "../../../middleware/dataValidation";
import { upload } from "../../../middleware/SendToCloudinary";

const router = Router()


router.post('/create-land',
    upload.array('file',3),
    (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
},
DataValidation(rentalZodHouseSchema),
LandController.createLandController)


router.get('/',LandController.getAllLandController)
// router.get('/:id',LandController.getSingleLandController)
// router.delete('/',LandController.deleteLandController)


export const LandRouter = router 