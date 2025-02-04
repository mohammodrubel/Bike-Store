import { Request, Response } from "express"
import { ProductService } from "./product.service"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"


const createProductController = CatchAsync(async (req: Request, res: Response) => {
    const product = req.body
    const result = await ProductService.createProductService(product)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Bike created successfully',
        data: result,
    })


})

const getAllProductsController = async (req: Request, res: Response) => {
    const result = await ProductService.getAllProductService(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bikes retrieved successfully',
        meta:result.meta,
        data: result.data,
    })
    // console.log(result)

}


const getSingleProductsController = async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await ProductService.getSingleProductService(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike Store single retrieved successfully',
        data: result,
    })

}


const updateProductsController = CatchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
    console.log(data)
    const result = await ProductService.updateProductService(id, data)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike updated successfully',
        data: result,
    })

})
const deleteProductController = CatchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await ProductService.deleteProductService(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike deleted successfully',
        data: result,
    })
}
)




export const productController = {
    createProductController,
    getAllProductsController,
    getSingleProductsController,
    updateProductsController,
    deleteProductController
}