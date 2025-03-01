import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";



    // Retrieve all users (tenants & landlords)
    const getAllUsersController= CatchAsync(async (req: Request, res: Response) => {
        const result = await AdminService.getAllUsersService();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "All user accounts retrieved successfully.",
            data: result,
        });
    })

    // Update user roles
    const updateUserRoleController = CatchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { role } = req.body; // Expecting role update from request body
        const result = await AdminService.updateUserRoleService(id, role);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `User role updated successfully for ID: ${id}.`,
            data: result,
        });
    })

    // Delete a user
    const deleteUserController = CatchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        await AdminService.deleteUserService(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `User with ID: ${id} deleted successfully.`,
            data: null,
        });
    })

    // Retrieve all rental listings
    const getAllListingsController = CatchAsync(async (req: Request, res: Response) => {
        const result = await AdminService.getAllListingsService();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "All rental listings retrieved successfully.",
            data: result,
        });
    })

    // Update or moderate a rental listing
    const updateListingController = CatchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await AdminService.updateListingService(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Rental listing with ID: ${id} updated successfully.`,
            data: result,
        });
    })
    // Remove a rental listing if necessary
    const deleteListingController  = CatchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        await AdminService.deleteListingService(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Rental listing with ID: ${id} deleted successfully.`,
            data: null,
        });
    })



export const AdminController = {
    getAllUsersController,
    deleteListingController,
    updateListingController,
    getAllListingsController,
    deleteUserController,
    updateUserRoleController
}