import { z } from 'zod';

 const OrderSchemaValidateion = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }),
  product: z.string({
    required_error: 'ProductId is required',
    invalid_type_error: 'ProductId must be a needed',
  }),
  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a Number',
  }),
  totalPrice: z.number({
    required_error: 'totalPrice is required',
    invalid_type_error: 'totalPrice must be a Number',
  }),
});

export default OrderSchemaValidateion
