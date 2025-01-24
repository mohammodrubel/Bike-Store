import { Router } from "express";

const router = Router() 

    router.post('/create-user')
    router.post('/login')
    router.post('refresh-token')


export const user = router 