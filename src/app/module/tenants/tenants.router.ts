

import { Router } from "express";
import { TenantsController } from "./tenants.controller";
import auth from "../../../middleware/auth";
import { USER__ROLE } from "../../interface/roleType";


const router = Router();

// Rental Listings
router.post('/requests', TenantsController.createTenantsController);
router.get('/requests',TenantsController.getAllTenantsController);
router.put('/profile/:id', TenantsController.updateTenantsController);
router.get('/my-request', auth(USER__ROLE.Tenant),TenantsController.getMyController)


export const tenantsRouter = router;

