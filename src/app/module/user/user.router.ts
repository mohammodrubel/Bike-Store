import { Router } from "express";
import { userController } from "./user.controller";
import { AuthController } from "../auth/auth.controller";

const router = Router() 

    router.post('/create-user',userController.createUserController)
    router.post('/login',AuthController.loginController)
    router.post('/refresh-token',AuthController.refreshTokenControler)
    router.post('/logout',AuthController.logoutController)


export const userRouter = router 