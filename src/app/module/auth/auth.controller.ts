import httpStatus from "http-status";
import config from "../../config";
import CatchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginController = CatchAsync(async (req, res) => {
    const result = await authService.loginUser(req.body)

    const { accessToken, refreshToken } = result
    res.cookie("refreshToken", refreshToken, {
        secure: config.node__env === 'production',
        httpOnly: true,

    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'login successfull',
        data: accessToken
    })
})

const refreshTokenControler = CatchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    const result = await authService.refreshTokenService(refreshToken)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:'AccessToken retrived successfully',
        data: result
    })
})


export const AuthController = {
    loginController,
    refreshTokenControler
}