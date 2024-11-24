import z from 'zod'

const name = z.string({
  required_error: 'Name is required',
  invalid_type_error: 'Name must be a string',
}).optional()

const productValidationUpdateSchema = z.object({
  name,
  brand: z.string({
    required_error: 'Brand is required',
    invalid_type_error: 'Brand must be a string',
  }).optional(),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }).optional(),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }).optional(),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }).optional(),
  inStock: z.boolean({
    required_error: 'Stock status is required',
    invalid_type_error: 'Stock status must be a boolean',
  }).optional(),
  description:z.string({
    required_error:"Description is required",
    invalid_type_error:"description must be string"
  }).optional()
})

export default productValidationUpdateSchema
