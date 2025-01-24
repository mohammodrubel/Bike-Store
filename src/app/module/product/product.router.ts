import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

// POST method 
router.post('/', productController.createProductController);

// GET method 
router.get('/', productController.getAllProductsController);

// GET method 
router.get('/:id', productController.getSingleProductsController);

// PUT method 
router.put('/:id', productController.updateProductsController);

// DELETE method 
router.delete('/:id', productController.deleteProductController);

export  const productRouter = router;
