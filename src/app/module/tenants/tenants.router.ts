import { NextFunction, Request, Response, Router } from "express";
import { LandController } from "./tenants.controller";
import { rentalZodHouseSchema } from "./tenants.zodValidation";
import DataValidation from "../../../middleware/dataValidation";
import { upload } from "../../../middleware/SendToCloudinary";

const router = Router()


router.post('/requests',
    upload.array('file',3),
    (req:Request,res:Response,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    next()
},
DataValidation(rentalZodHouseSchema),
LandController.createTenantsController)


router.get('/requests',LandController.getAllTenantsController)
router.put('/profile',LandController.updateSingleTenantsController)



export const LandRouter = router 
