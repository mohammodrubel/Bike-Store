import { Request, Response } from "express"
import httpStatus from 'http-status'
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import { OrderService } from "./order.service"


const createOrderController = CatchAsync(async (req: Request, res: Response) => {
    const product = req.body
    const result = await OrderService.createOrderService(product)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "order created successfully",
        data: result
    })
}
)

const getAllOrderController = CatchAsync(async (req, res) => {
    const result = await OrderService.getAllOrderService()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "all order ",
        data: result
    })
})


const getOrderRevenueController = CatchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getOrderRevenueService()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Revenue calculated successfully',
        data: result,
    })
})

const getSingleOrderControler = CatchAsync(async (req, res) => {
    const id = req.params.id
    const result = await OrderService.singleOrderService(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single order shwen successfully',
        data: result,
    })
})

const orderUpdateController = CatchAsync(async (req, res) => {
    const id = req.params.id
    const data = req.body
    const result = await OrderService.orderUpdateService(data,id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'update successfully successfully',
        data: result,
    })
})



export const OrderController = {
    orderUpdateController,
    createOrderController,
    getOrderRevenueController,
    getAllOrderController,
    getSingleOrderControler,
}