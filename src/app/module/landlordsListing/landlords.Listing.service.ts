

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
const getAlllandLordsService = async (query: Record<string, unknown>) => {
  const cloneQuery = { ...query };
  let search = "";
  let sort = '-createdAt';
  let limit = 10;
  let page = 1;
  let skip = 0;
  let fields = '-__v';
  let priceRange = "0,0"; // Default price range

  // Extract search term from query
  if (query?.search) {
    search = query.search as string;
  }

  // Extract price range from query
  if (query?.priceRange) {
    priceRange = query.priceRange as string;
  }

  // Define fields that are strings and can be searched with regex
  const stringFields = ["rental_house_location", "amenities", "details_description"];
  
  // Fields that should be excluded from the filter query
  const outsideFields = ['search', 'limit', 'page', 'sort', 'fields', 'priceRange'];

  // Implement search for dynamic fields
  const searchQuery = Listing.find({
    $or: stringFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
  });

  // Remove fields that are not part of the filter criteria
  outsideFields.forEach((el) => delete cloneQuery[el]);

  // Parse the price range
  const [minPrice, maxPrice] = priceRange.split(',').map(Number);

  // Add price range filter to the query
  if (minPrice && maxPrice) {
    cloneQuery.rent_amount = { $gte: minPrice, $lte: maxPrice };
  }

  // Apply filters to the search query
  const filterQuery = searchQuery.find(cloneQuery).populate("landlord");

  // Apply sorting if provided in the query
  if (query?.limit) {
    limit = Number(query.limit) as number;
  }
  if (query?.sort) {
    sort = query.sort as string;
  }
  if (query?.page) {
    page = Number(query?.page) as number;
    skip = (page - 1) * limit;
  }
  if (query?.fields) {
    fields = (query?.fields as string)?.split(',').join(' ');
  }

  // Apply sorting to the filtered query
  const sortQuery = filterQuery.sort(sort);

  const paginateQuery = sortQuery.skip(skip);

  // Execute the query and return the results
  const limitQuery = paginateQuery.limit(limit);

  const fieldQuery = await limitQuery.select(fields);

  // Calculate the total number of documents that match the query
  const totalDocument = await Listing.countDocuments({
    $or: stringFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
    ...cloneQuery,
  });

  // Prepare the metadata
  const meta = {
    total: totalDocument,
    limit: limit,
    page: page,
  };

  return { meta: meta, data: fieldQuery };
};



const updateTenantsService = async () => {

}

const getAllLandloardsRequestService = async () => {

}
const updateLandloardsRequestService = async () => {

}

export const landlordsListingService = {
  createlandLordsService,
  getAlllandLordsService,
  updateTenantsService,
  getAllLandloardsRequestService,
  updateLandloardsRequestService
}

//.populate("landlord")