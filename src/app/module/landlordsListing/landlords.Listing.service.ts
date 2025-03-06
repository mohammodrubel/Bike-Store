

/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { sendImageToCloudinary } from "../../../middleware/SendToCloudinary";
import App__error from "../../Error/App__Error";
import { TLandlords } from "./landlords.Listing.interface";
import { Listing } from "./landlords.Listing.model";


const createlandLordsService = async (file: any, data: Partial<TLandlords>) => {
    console.log(file)
    if (!file || file.length === 0) {
        throw new App__error(httpStatus.BAD_REQUEST, 'At least one image is required');
    }

    const imageUploadPromise = file?.map((item: any) => sendImageToCloudinary(item.path))
    const uploadImage = await Promise.all(imageUploadPromise)
    const image = uploadImage.map((item) => item.secure_url)
    const newLandData = { ...data, multiple_images: image }
    const reuslt = await Listing.create(newLandData)
    return reuslt

}

const getAlllandLordsService = async () => {
    const result = await Listing.find({}).populate("landlord");
    return result;
};

const updateTenantsService = async (id: string, data: Partial<TLandlords>) => {

}

const getAllLandloardsRequestService = async () => {

}
const updateLandloardsRequestService = async (id: string) => {

}

export const landlordsListingService = {
    createlandLordsService,
    getAlllandLordsService,
    updateTenantsService,
    getAllLandloardsRequestService,
    updateLandloardsRequestService
}