import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

// POST method 
router.post('/products', productController.createProductController);

// GET method 
router.get('/products', productController.getAllProductsController);

// GET method 
router.get('/products/:id', productController.getSingleProductsController);

// PUT method 
router.put('/products/:id', productController.updateProductsController);

// DELETE method 
router.delete('/products/:id', productController.deleteProductController);

export  const productRouter = router;
