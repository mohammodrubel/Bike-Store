import { Request, Response } from "express"
import { ProductService } from "./product.service"
import config from "../../config"


const createProductController = async (req: Request, res: Response) => {
    try {
        const product = req.body
        const result = await ProductService.createProductService(product)

        res.status(200).json({
            status: true,
            message: 'Bike created successfully',
            data: result,
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            success: false,
            message: err?.error || 'somting went wrong',
            error: err,
            stack: config.node__env === 'development' ? err.stack : undefined,
        })
    }
}

const getAllProductsController = async(req: Request, res: Response)=>{
    try {
        const searchTerm  = req?.query?.searchTerm
        const result = await ProductService.getAllProductService(searchTerm as string)

        res.status(200).json({
            status: true,
            message: 'Bikes retrieved successfully',
            data: result,
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            success: false,
            message: err?.error || 'somting went wrong',
            error: err,
            stack: config.node__env === 'development' ? err.stack : undefined,
        })
    }
}


const getSingleProductsController = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id 
        const result = await ProductService.getSingleProductService(id)

        res.status(200).json({
            status: true,
            message: 'Bikes retrieved successfully',
            data: result,
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            success: false,
            message: err?.error || 'somting went wrong',
            error: err,
            stack: config.node__env === 'development' ? err.stack : undefined,
        })
    }
}


const updateProductsController = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id 
        const data = req.body 
        console.log(data)
        const result = await ProductService.updateProductService(id,data)

        res.status(200).json({
            status: true,
            message: 'Bike updated successfully',
            data: result,
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            success: false,
            message: err?.error || 'somting went wrong',
            error: err,
            stack: config.node__env === 'development' ? err.stack : undefined,
        })
    }
}
const deleteProductController = async(req: Request, res: Response)=>{
    try {
        const id = req.params.id 
        await ProductService.deleteProductService(id)

        res.status(200).json({
            status: true,
            message: 'Bike deleted successfully',
            data: {},
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {

        res.status(500).json({
            success: false,
            message: err?.error || 'somting went wrong',
            error: err,
            stack: config.node__env === 'development' ? err.stack : undefined,
        })
    }
}





export const productController = {
    createProductController,
    getAllProductsController,
    getSingleProductsController,
    updateProductsController,
    deleteProductController
}