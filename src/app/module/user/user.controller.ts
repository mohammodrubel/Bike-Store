import { Request, Response } from "express"
import CatchAsync from "../../utils/CatchAsync"
import { Userservice } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

const createUserController = CatchAsync(async (req:Request,res:Response)=>{
    const result = await Userservice.createUserService(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message:'new user created successfully',
        data: result,
    })
})

export const userController = {
    createUserController
}