import { Request, Response } from "express"
import httpStatus from "http-status"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import { Userservice } from "./user.service"
import { JwtPayload } from "jsonwebtoken"

const createUserController = CatchAsync(async (req: Request, res: Response) => {
    const result = await Userservice.createUserService(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'new user created successfully',
        data: result,
    })
})

const changePasswordController = CatchAsync(async (req: Request, res: Response) => {
    const result = await Userservice.changePasswordService(req?.body, req?.user as JwtPayload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'password Change successfully done',
        data: result,
    })
})

const getAllUserController = CatchAsync(async(req:Request,res:Response)=>{
    const result =await Userservice.getAllUserService()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'show all users',
        data: result,
    })
})



export const userController = {
    createUserController,
    changePasswordController,
    getAllUserController
}