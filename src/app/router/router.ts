import { Router } from 'express'
import { LandRouter } from '../module/tenants/tenants.router'
import { LandLordsListing } from '../module/landlordsListing/landlords.Listing.router'
import { userRouter } from '../module/user/user.router'


const router = Router()

const myRouter = [
    { path: '/user', route: userRouter },
    { path: '/landlords', route: LandRouter },
    { path: '/landlords', route: LandLordsListing },
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router