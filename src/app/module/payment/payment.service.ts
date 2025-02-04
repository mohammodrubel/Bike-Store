// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import httpStatus from "http-status";
import App__error from "../../Error/App__Error";
import { Order } from "../order/order.model";
import { Payment } from "./paymentModel";
import SSLCommerzPayment from 'sslcommerz-lts';
import { updatePaymentAndOrderStatus } from "./payment.utils";
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false;

type OrderType = {
    _id: string;
    customar: {
        _id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        isBlocked: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    products: {
        name: string;
        image: string;
        orderQuantity: number;
        brand: string;
        price: number;
        category: string;
        inStock: boolean;
        quantity: number;
        description: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
    }[];
    payment_method: string;
    transaction_id: string;
    shippingAddress: {
        fullName: string;
        phone: string;
        address: string;
        address2: string;
        _id: string;
    };
    total: number;
    grandTotal: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

const createPaymentService = async (orderId: string) => {
    const order: OrderType | null = await Order.findById(orderId).populate("customar").lean<OrderType>();

    if (!order) {
        throw new App__error(httpStatus.NOT_FOUND, "Order not found.");
    }

    // Find the payment information
    const payment = await Payment.findOne({ order_id: orderId });

    if (!payment) {
        throw new App__error(httpStatus.NOT_FOUND, "Payment information not found.");
    }

    // Check if the payment has already been completed
    if (payment.status === "PAID") {
        throw new App__error(httpStatus.BAD_REQUEST, "Payment already completed.");
    }

    console.log(order)

   
    const data = {
      total_amount: payment.amount,
      currency: 'BDT',
      tran_id: payment.transaction_id,
      success_url: `${process.env.BACKEND_BASE_URL}/payment/ipn_listener`,
      fail_url: `${process.env.BACKEND_BASE_URL}/payment/ipn_listener`,
      cancel_url: `${process.env.BACKEND_BASE_URL}/payment/ipn_listener`,
      ipn_url: `${process.env.BACKEND_BASE_URL}/payment/ipn_listener`,
      shipping_method: 'N/A',
      product_name: 'Bicycle',
      product_category: 'N/A',
      product_profile: 'N/A',
      cus_name: order.customar.name,
      cus_email: order.customar.email,
      cus_add1: order.shippingAddress.address,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: order.shippingAddress.phone,
      cus_fax: 'N/A',
      ship_name: 'N/A',
      ship_add1: 'N/A',
      ship_add2: 'N/A',
      ship_city: 'N/A',
      ship_state: 'N/A',
      ship_postcode: 'N/A',
      ship_country: 'N/A',
    };
  
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const sslResponse = await sslcz.init(data);

    return sslResponse.GatewayPageURL;

};

const VerifyPayment = async (payload) => {
  console.log(payload,'service theke')
    if (!payload.val_id || payload.status !== 'VALID') {
      if (payload.status === 'FAILED') {
        await updatePaymentAndOrderStatus(payload.tran_id, 'FAILED', 'FAILED');
        return `${process.env.FRONTEND_BASE_URL}/${process.env.PAYMENT_FAIL_URL}`;
      }
  
      if (payload.status === 'CANCELLED') {
        await updatePaymentAndOrderStatus(
          payload.tran_id,
          'CANCELLED',
          'CANCELLED',
        );
        return `${process.env.FRONTEND_BASE_URL}/${process.env.PAYMENT_CANCEL_URL}`;
      }
  
      throw new App__error(httpStatus.BAD_REQUEST, 'Invalid IPN request');
    }
  
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  
    const response = await sslcz.validate({
      val_id: payload.val_id,
    });
  
    if (response.status !== 'VALID' && response.status !== 'VALIDATED') {
      await updatePaymentAndOrderStatus(response.tran_id, 'FAILED', 'FAILED');
      return `${process.env.FRONTEND_BASE_URL}/${process.env.PAYMENT_FAIL_URL}`;
    }
  
    await updatePaymentAndOrderStatus(response.tran_id, 'PAID', 'PAID', response);
  
    return `${process.env.FRONTEND_BASE_URL}/${process.env.PAYMENT_SUCCESS_URL}`;
  };
  

export const PaymentService = {
    createPaymentService,
    VerifyPayment
};
