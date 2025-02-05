import express from "express";
import auth from "../../../middleware/auth";
import DataValidation from "../../../middleware/dataValidation";
import { OrderController } from "./order.controller";
import { orderSchemaValidation } from "./order.validation";


const router = express.Router();

// POST method 
router.post('/', auth("admin", "customer"), DataValidation(orderSchemaValidation), OrderController.createOrderController);
router.get('/', OrderController.getAllOrderController);
router.get('/:id', OrderController.getSingleOrderControler);
// GET method 
router.get('/revenue', OrderController.getOrderRevenueController);


export const orderRouter = router;
