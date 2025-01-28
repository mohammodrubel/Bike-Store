/* eslint-disable @typescript-eslint/no-explicit-any */

// import QueryBuilder from "../../custom/QueryBuilder";
import { Tproduct } from "./product.interface";
import { Product } from "./product.model";
import productValidationUpdateSchema from "./product.update.validation";
import productValidation from "./product.validation";

const createProductService = async (payload: Tproduct) => {
    const validationMyPayload = productValidation.parse(payload)
    const result = await Product.create(validationMyPayload)
    return result
}






const getAllProductService = async (query: Record<string, unknown>) => {
    const {
      search,
      priceRange,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
      fields,
      ...restFilters
    } = query;
  
    const filterConditions: Record<string, unknown> = { ...restFilters };
  
    Object.keys(filterConditions).forEach((key) => {
      if (filterConditions[key] === 'true' || filterConditions[key] === 'false') {
        filterConditions[key] = filterConditions[key] === 'true';
      }
    });
  
    if (search) {
      filterConditions.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
  
    if (priceRange) {
      const [minPrice, maxPrice] = (priceRange as string).split('-').map(Number);
      filterConditions.price = { $gte: minPrice, $lte: maxPrice };
    }
  
   
  
    const skip = (Number(page) - 1) * Number(limit);
  
    const sortCondition =
      sortBy && sortOrder
        ? `${sortOrder === 'asc' ? '' : '-'}${sortBy}`
        : '-createdAt';
  
    // Field selection
    const projection = fields
      ? (fields as string).split(',').join(' ')
      : '-__v -createdAt -updatedAt ';
  
    const [data, total] = await Promise.all([
      Product.find(filterConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(Number(limit))
        .select(projection),
  
      Product.countDocuments(filterConditions),
    ]);
  
    return {
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
      data,
    };
  };
  









const getSingleProductService = async (id: string) => {
    const result = await Product.findById(id)
    return result
}
const updateProductService = async (id:string, data: Partial<Tproduct>) => {
    // Validate the data using the schema
    const validationData = productValidationUpdateSchema.parse(data);
    
    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(id, validationData, { new: true });

    if (!updatedProduct) {
        throw new Error("Product not found");
    }

    // if quantity increse i want to change status in inStock 
    if (updatedProduct.quantity > 0) {
        updatedProduct.inStock = true;
    } else {
        updatedProduct.inStock = false;
    }

   
    await updatedProduct.save();

    return updatedProduct;
};
const deleteProductService = async (id: string) => {
    const result = await Product.findByIdAndDelete(id)
    return result
}



export const ProductService = {
    createProductService,
    getAllProductService,
    getSingleProductService,
    updateProductService,
    deleteProductService
}