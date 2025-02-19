import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopService } from "./shopService";

const createShopController = CatchAsync(async (req, res) => {
    const reuslt = shopService.createShopService(req.body,req?.file)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "new shop created Successfully",
        data:await reuslt
    })

})



export const ShopController = {
    createShopController
}