import express from "express";
import { OrderController } from "./order.controller";


const router = express.Router();

// POST method 
router.post('/',OrderController.createOrderController);

// GET method 
router.get('/revenue', OrderController.getOrderRevenueController);


export const orderRouter =  router;
