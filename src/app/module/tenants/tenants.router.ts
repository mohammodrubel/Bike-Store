

import { Router } from "express";
import { TenantsController } from "./tenants.controller";


const router = Router();

// Rental Listings
router.post('/requests', TenantsController.createTenantsController);
router.get('/requests', TenantsController.getAllTenantsController);
router.put('/profile/:id', TenantsController.updateTenantsController);


export const tenantsRouter = router;

