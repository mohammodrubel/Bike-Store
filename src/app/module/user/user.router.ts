import { Router } from "express";
import auth from "../../../middleware/auth";
import { AuthController } from "../auth/auth.controller";
import { userController } from "./user.controller";

const router = Router() 

    router.post('/create-user',userController.createUserController)
    router.post('/login',AuthController.loginController)
    router.post('/refresh-token',AuthController.refreshTokenControler)
    router.post('/change-password',auth("admin","customer"),userController.changePasswordController)
    router.post('/logout',AuthController.logoutController)

export const userRouter = router 