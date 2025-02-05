import { Router } from "express";
import { userController } from "./user.controller";
import { AuthController } from "../auth/auth.controller";
import auth from "../../../middleware/auth";

const router = Router() 

    router.post('/create-user',userController.createUserController)
    router.post('/login',AuthController.loginController)
    router.post('/refresh-token',AuthController.refreshTokenControler)
    router.post('/change-password',auth("admin","customer"),userController.changePasswordController)
    router.post('/logout',AuthController.logoutController)
    router.get('/myorder',auth('admin','customer'),userController.myOrderController)


export const userRouter = router 