import express from "express";
import { OrderController } from "./order.controller";


const router = express.Router();

// POST method 
router.post('/orders',OrderController.createOrderController);

// GET method 
router.get('/orders/revenue', OrderController.getOrderRevenueController);


export const orderRouter =  router;
