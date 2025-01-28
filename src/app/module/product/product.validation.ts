import z from 'zod'

const name = z.string({
  required_error: 'Name is required',
  invalid_type_error: 'Name must be a string',
})

const productValidation = z.object({
  name,
  brand: z.string({
    required_error: 'Brand is required',
    invalid_type_error: 'Brand must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  image:z.string(),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
  inStock: z.boolean({
    required_error: 'Stock status is required',
    invalid_type_error: 'Stock status must be a boolean',
  }),
  description:z.string({
    required_error:"Description is required",
    invalid_type_error:"description must be string"
  })
})

export default productValidation
