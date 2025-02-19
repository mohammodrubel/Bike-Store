/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TShop } from "./shopInterface";
import { Shop } from "./shopModel";

const createShopService = async (data: TShop, file: any) => {
    try {
        if (!file?.path) {
            throw new Error("File is required for shop creation.");
        }

        const imagename = `${data?.shopName}-${Date.now()}`;
        const { secure_url } = await sendImageToCloudinary(imagename, file.path);

        if (!secure_url) {
            throw new Error("Failed to upload image to Cloudinary.");
        }

        const shopCreateData = { ...data, logo: secure_url };
        const result = await Shop.create(shopCreateData);
        return result;
    } catch (error) {
        console.error("Error creating shop:", error);
        throw error;
    }
};

export const shopService = {
    createShopService
}