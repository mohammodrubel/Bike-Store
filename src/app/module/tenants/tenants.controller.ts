import { Request, Response } from "express"
import httpStatus from "http-status"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import { LandService } from "./tenants.service"

const createTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const file = req.files 
    const data = req.body 
    const result = LandService.createTenantsService(file,data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'create new Land successfully',
        data:await result,
    })
})
const getAllTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const result = LandService.getAllTenantsService()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get All Land ',
        data:await result,
    })
})

const updateSingleTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const result = LandService.updateTenantsService(req?.params?.id,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get Single Land',
        data: result,
    })
})








export const LandController = {
   createTenantsController,
   getAllTenantsController,
   updateSingleTenantsController
}

