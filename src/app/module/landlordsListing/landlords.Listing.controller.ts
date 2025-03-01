import { Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { LandLoardsService } from "./landlords.Listing.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const createLandloardsListing = CatchAsync(async (req: Request, res: Response) => {
    const result = await LandLoardsService.createLandloardsListingService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Landlord request created successfully.",
        data: result,
    });
});

const getAllLandloardssListing = CatchAsync(async (req: Request, res: Response) => {
    const result = await LandLoardsService.getAllLandloardsListingService();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All landlord requests retrieved successfully.",
        data: result,
    });
});

const getSingleLandloardsListing = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await LandLoardsService.getSingleLandloardsListingService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} retrieved successfully.`,
        data: result,
    });
});

const updateLandloardsListing = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await LandLoardsService.updateLandloardsListingService(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} updated successfully.`,
        data: result,
    });
});

const deleteLandloardsListing = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await LandLoardsService.deleteLandloardsListingService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID ${id} deleted successfully.`,
        data: null,
    });
});

const getAllLandloardsRequest = CatchAsync(async (req: Request, res: Response) => {
    await LandLoardsService.getAllLandloardsRequestService();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with all request successfully.`,
        data: null,
    });
});

const updateLandloardsRequestService = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await LandLoardsService.updateLandloardsRequestService(id,req?.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID  update successfully.`,
        data: null,
    });
});


export const LandLoardsListingController = {
    createLandloardsListing,
    getAllLandloardssListing,
    getSingleLandloardsListing,
    updateLandloardsListing,
    deleteLandloardsListing,
    getAllLandloardsRequest,
    updateLandloardsRequestService
}

