import { Router } from "express";
import { ShopController } from "./shopController";

const router = Router()

    router.post(`/`,ShopController.createShopController)

export const shopRouter = router 