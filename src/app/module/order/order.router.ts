import express from "express";
import { OrderController } from "./order.controller";
import DataValidation from "../../../middleware/dataValidation";
import { orderSchemaValidation } from "./order.validation";
import auth from "../../../middleware/auth";


const router = express.Router();

// POST method 
router.post('/',auth("admin","customer"),DataValidation(orderSchemaValidation),OrderController.createOrderController);

// GET method 
router.get('/revenue', OrderController.getOrderRevenueController);


export const orderRouter =  router;
