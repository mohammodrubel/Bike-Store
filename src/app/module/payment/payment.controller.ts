import { Request, Response } from "express"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPaymentController = CatchAsync(async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const result = await PaymentService.createPaymentService(orderId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment created successfully',
    data:result
  })
})

const VerifyPayment = CatchAsync(async (req, res) => {
  console.log(req)
  const result = await PaymentService.VerifyPayment(req.body);
  res.redirect(result);
});

export const PaymentController = {
    createPaymentController,
    VerifyPayment
}