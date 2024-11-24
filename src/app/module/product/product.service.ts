import { Tproduct } from "./product.interface";
import { Bike } from "./product.model";
import productValidationUpdateSchema from "./product.update.validation";
import productValidation from "./product.validation";

const createProductService = async (payload: Tproduct) => {
    const validationMyPayload = productValidation.parse(payload)
    const result = await Bike.create(validationMyPayload)
    return result
}
const getAllProductService = async (searchTerm:string) => {
    // Check if mySearchQuery contains any search term (assuming 'searchTerm' is part of mySearchQuery)
    if (searchTerm) {
        const result = await Bike.find(
            {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } }
                ]
            }
        );
        return result;
    }
    
    // If no search term, return all products
    const result = await Bike.find({});
    return result;
};

const getSingleProductService = async (id: string) => {
    const result = await Bike.findById(id)
    return result
}
const updateProductService = async (id:string, data: Partial<Tproduct>) => {
    // Validate the data using the schema
    const validationData = productValidationUpdateSchema.parse(data);
    
    // Update the product in the database
    const updatedProduct = await Bike.findByIdAndUpdate(id, validationData, { new: true });

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
    const result = await Bike.findByIdAndDelete(id)
    return result
}



export const ProductService = {
    createProductService,
    getAllProductService,
    getSingleProductService,
    updateProductService,
    deleteProductService
}