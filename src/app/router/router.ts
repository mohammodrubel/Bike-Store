import { Router } from 'express'
import { productRouter } from '../module/product/product.router'
import { orderRouter } from '../module/order/order.router'
import { userRouter } from '../module/user/user.router'
import { paymentRoute } from '../module/payment/payment.router'
// import { paymentRouter } from '../module/payment/payment.router'

const router = Router()

const myRouter = [
    {path:'/user',route:userRouter},
    { path: '/products', route: productRouter },
    { path: '/orders', route: orderRouter },
    {path: '/payment',route: paymentRoute}
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router