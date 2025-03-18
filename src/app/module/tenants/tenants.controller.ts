import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { TenantsService } from "./tenants.service";




const createTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const result = await TenantsService.createTenantsService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Landlord request created successfully.",
        data: result,
    });
});

const getAllTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const result = await TenantsService.getAllTenantsService();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All landlord requests retrieved successfully.",
        data: result,
    });
});

const getMyController = CatchAsync(async(req:Request,res:Response)=>{
     const result = await TenantsService.getMySingleService(req?.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get my all request.",
        data: result,
    });
})

const getSingleTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TenantsService.getSingleTenantsService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} retrieved successfully.`,
        data: result,
    });
});

const updateTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TenantsService.updateTenantsService(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} updated successfully.`,
        data: result,
    });
});

const deleteTenantsController = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await TenantsService.deleteTenantsService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} deleted successfully.`,
        data: null,
    });
});




export const TenantsController = {
    createTenantsController,
    getAllTenantsController,
    getSingleTenantsController,
    updateTenantsController,
    deleteTenantsController,
    getMyController
}