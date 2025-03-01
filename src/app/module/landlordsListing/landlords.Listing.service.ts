import { TLandlordsRequest } from "./landlords.Listing.interface";

const createLandloardsListingService = async (data: TLandlordsRequest) => {

}

const getAllLandloardsListingService = async () => {

}

const getSingleLandloardsListingService = async (id: string) => {

}

const updateLandloardsListingService = async (id: string, data: Partial<TLandlordsRequest>) => {

}

const deleteLandloardsListingService = async (id: string) => {

}

const getAllLandloardsRequestService = async () => {

}
const updateLandloardsRequestService = async (id:string,data:Partial<TLandlordsRequest>) => {

}
export const LandLoardsService = {
    createLandloardsListingService,
    getAllLandloardsListingService,
    getSingleLandloardsListingService,
    updateLandloardsListingService,
    deleteLandloardsListingService,
    getAllLandloardsRequestService,
    updateLandloardsRequestService
}