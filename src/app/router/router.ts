import { Router } from 'express'
import { userRouter } from '../module/user/user.router'
// import { paymentRouter } from '../module/payment/payment.router'

const router = Router()

const myRouter = [
    {path:'/user',route:userRouter},
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router