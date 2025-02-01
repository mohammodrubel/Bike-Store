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

const logoutController = CatchAsync(async (req, res) => {
    // Clear the refresh token by setting the cookie with an empty value and immediate expiration
    res.cookie("refreshToken", "", {
        secure: config.node__env === 'production',
        httpOnly: true,
        expires: new Date(0), 
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Logout successfully',
        data: [],
    });
});


export const AuthController = {
    loginController,
    refreshTokenControler,
    logoutController
}