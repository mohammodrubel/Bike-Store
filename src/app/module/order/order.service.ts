import { Bike } from "../product/product.model"
import { Torders } from "./order.interface"
import { Order } from "./order.model"
import OrderSchemaValidateion from "./order.validation"

const createOrderService = async (payload: Torders) => {
  // Validate my payload
  const validatedPayload = OrderSchemaValidateion.parse(payload);

  // Check  product exists
  const findingProduct = await Bike.findById(validatedPayload.product);
  if (!findingProduct) {
    throw new Error('This is not a valid product ID');
  }

  
  if (validatedPayload.quantity > findingProduct.quantity) {
    throw new Error('Insufficient stock');
  }

  // Update product stock
  findingProduct.quantity -= validatedPayload.quantity;

  
  if (findingProduct.quantity === 0) {
    findingProduct.inStock = false;
  }

  await findingProduct.save();

  // Create and save the order
  const result = await Order.create(validatedPayload);
  return result;
};

const getOrderRevenueService = async () => {
  const revenue = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },

    { $project: { totalRevenue: 1 ,_id:0 } }
  ]);

  const result = revenue[0]
  return result

  
};


export const OrderService = {
  createOrderService,
  getOrderRevenueService
}