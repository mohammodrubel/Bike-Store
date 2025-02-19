import { NextFunction, Request, Response, Router } from "express";
import { ShopController } from "./shopController";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router()

    router.post('/create-shop',upload.single('file'),(req:Request,res:Response,next:NextFunction)=>{
        req.body = JSON.parse(req.body.data);
        next()
    },ShopController.createShopController)

export const shopRouter = router 