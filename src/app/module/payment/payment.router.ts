import express from "express";
import { PaymentController } from "./payment.controller";


const router = express.Router();

// POST method 



router.post('/ipn_listener', PaymentController.VerifyPayment);
router.post('/intent/:orderId',PaymentController.createPaymentController);

export const paymentRoute =  router;
