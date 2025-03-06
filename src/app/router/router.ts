import { Router } from 'express'

import { userRouter } from '../module/user/user.router'
import { tenantsRouter } from '../module/tenants/tenants.router'
import { landlordsListingRouter } from '../module/landlordsListing/landlords.Listing.router'


const router = Router()

const myRouter = [
    { path: '/user', route: userRouter },
    { path: '/tenants', route: tenantsRouter },
    { path: '/landlords', route: landlordsListingRouter },
   
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router