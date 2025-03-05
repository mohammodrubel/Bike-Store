import { Router } from "express";
import auth from "../../../middleware/auth";
import { AuthController } from "../auth/auth.controller";
import { userController } from "./user.controller";

const router = Router() 

    router.post('/create-user',userController.createUserController)
    router.post('/login',AuthController.loginController)
    router.post('/refresh-token',AuthController.refreshTokenControler)
    router.post('/change-password',auth("Landlord" , "Admin" , "Tenant"),userController.changePasswordController)
    router.post('/logout',AuthController.logoutController)
    router.get('/',userController.getAllUserController)

export const userRouter = router 