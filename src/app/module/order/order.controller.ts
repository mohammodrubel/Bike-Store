import { Request, Response } from "express"
import { OrderService } from "./order.service"


const createOrderController = async(req:Request,res:Response)=>{
    try {
        const product = req.body
        const result = await OrderService.createOrderService(product)

        res.status(201).json({
            status: true,
            message: 'Order created successfully',
            data: result,
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            status: false,
            message: err?.message || 'somting went wrong',
            error: err,
        })
    }
}

const getOrderRevenueController = async(req:Request,res:Response)=>{
    try{
        const result = await OrderService.getOrderRevenueService()
        res.status(201).json({
            status: true,
            message: 'Revenue calculated successfully',
            data: result,
        })
    }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){
        res.status(500).json({
            status: false,
            message: err?.err || 'somting went wrong',
            error: err,
        })
    }
}


export const OrderController = {
    createOrderController,
    getOrderRevenueController
}