/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status"
import App__error from "../../Error/App__Error"
import { TLandlords } from "./land.interface"
import { sendImageToCloudinary } from "../../../middleware/SendToCloudinary";
import { Landlords } from "./land.model";

const createLandService =async(file:any, data:Partial<TLandlords>)=>{
    if (!file || file.length === 0) {
        throw new App__error(httpStatus.BAD_REQUEST,'At least one image is required');
    }

    const imageUploadPromise = file?.map((item:any)=> sendImageToCloudinary(item.path))
    const uploadImage = await Promise.all(imageUploadPromise)
    const image =  uploadImage.map((item)=> item.secure_url)
    const newLandData =  {...data,multiple_images:image}
    const reuslt = await Landlords.create(newLandData)
    return reuslt

}

const getAllLandService = async () => {
    const result = await Landlords.find({}).populate("landlord");
return result;
  };

const getSingleLandAdviser = {

    
}

const deleteLandAdviser = {

}

export const LandService = {
    createLandService,
    getAllLandService,
    getSingleLandAdviser,
    deleteLandAdviser
}