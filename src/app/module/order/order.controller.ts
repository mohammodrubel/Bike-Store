import { Request, Response } from "express"
import { OrderService } from "./order.service"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status'


const createOrderController = CatchAsync(async(req:Request,res:Response)=>{
        const product = req.body
        const result = await OrderService.createOrderService(product)
       
        sendResponse(res,{
            statusCode:httpStatus.CREATED,
            success:true ,
            message:"order created successfully",
            data:result
        })
}
)
const getOrderRevenueController = CatchAsync(async(req:Request,res:Response)=>{
        const result = await OrderService.getOrderRevenueService()
       
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success: true,
        message: 'Revenue calculated successfully',
        data: result,
    })
})


export const OrderController = {
    createOrderController,
    getOrderRevenueController
}