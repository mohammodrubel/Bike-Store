import { Request, Response } from "express"
import httpStatus from "http-status"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import { LandService } from "./land.service"

const createLandController = CatchAsync(async (req: Request, res: Response) => {
    const file = req.files 
    const data = req.body 
    const result = LandService.createLandService(file,data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'create new Land successfully',
        data:await result,
    })
})
const getAllLandController = CatchAsync(async (req: Request, res: Response) => {
    const result = LandService.getAllLandService()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get All Land ',
        data:await result,
    })
})

// const getSingleLandController = CatchAsync(async (req: Request, res: Response) => {
//     const result = LandService.createLandService(req.body)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'get Single Land',
//         data: result,
//     })
// })

// const deleteLandController = CatchAsync(async (req: Request, res: Response) => {
//     const result = LandService.createLandService(req.body)
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'delete Single Land',
//         data: result,
//     })
// })






export const LandController = {
    createLandController,
    getAllLandController,
    // getSingleLandController,
    // deleteLandController
}

