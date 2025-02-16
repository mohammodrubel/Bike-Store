import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopService } from "./shopService";

const createShopController = CatchAsync(async(req,res)=>{
    const reuslt = shopService.createShopService(req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"new shop created Successfully",
        data:reuslt
    }) 
    
})



export const ShopController = {
    createShopController
}