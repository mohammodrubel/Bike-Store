

import { Request, Response } from "express"
import httpStatus from "http-status"
import CatchAsync from "../../utils/CatchAsync"
import sendResponse from "../../utils/sendResponse"
import { landlordsListingService } from "./landlords.Listing.service"


const createlandlordsListingController = CatchAsync(async (req: Request, res: Response) => {
    const file = req.files
    const data = req.body
    const result = landlordsListingService.createlandLordsService(file, data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'create new Land successfully',
        data: await result,
    })
})
const getAlllandlordsListingController = CatchAsync(async (req: Request, res: Response) => {
    const result = landlordsListingService.getAlllandLordsService(req?.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get All Land ',
        data: await result,
    })
})
const getSinglelandlordsListingController = CatchAsync(async (req: Request, res: Response) => {
    const result = landlordsListingService.getSingleLandLordsService(req?.params?.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single Land ',
        data: await result,
    })
})

const updateSinglelandlordsListingController = CatchAsync(async (req: Request, res: Response) => {
    const result = landlordsListingService.updateTenantsService(req?.params?.id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get Single Land',
        data: result,
    })
})

const getAllLandloardsRequest = CatchAsync(async (req: Request, res: Response) => {
    await landlordsListingService.getAllLandloardsRequestService();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with all request successfully.`,
        data: null,
    });
});

const updateLandloardsRequestService = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await landlordsListingService.updateLandloardsRequestService(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Landlord request with ID  update successfully.`,
        data: null,
    });
});






export const landlordsListingController = {
    createlandlordsListingController,
    getAlllandlordsListingController,
    getSinglelandlordsListingController,
    updateSinglelandlordsListingController,
    updateLandloardsRequestService,
    getAllLandloardsRequest
}

