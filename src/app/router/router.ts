import { Router } from 'express'
import { productRouter } from '../module/product/product.router'
import { orderRouter } from '../module/order/order.router'
import { userRouter } from '../module/user/user.router'

const router = Router()

const myRouter = [
    {path:'/user',route:userRouter},
    { path: '/products', route: productRouter },
    { path: '/orders', route: orderRouter },
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router