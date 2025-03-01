import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

// User Management
router.get('/users', AdminController.getAllUsersController); // Retrieve all users (tenants, landlords)
router.put('/users/:id', AdminController.updateUserRoleController); // Update user roles
router.delete('/users/:id', AdminController.deleteUserController); // Delete a user

// Rental Listings Management
router.get('/listings', AdminController.getAllListingsController); // Retrieve all rental listings
router.put('/listings/:id', AdminController.updateListingController); // Update or moderate a listing
router.delete('/listings/:id', AdminController.deleteListingController); // Remove a rental listing if necessary

export const adminRouter = router;
