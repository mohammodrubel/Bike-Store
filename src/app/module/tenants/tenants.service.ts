import { TLandlordsRequest } from "./tenants.interface";
import { Request } from "./tenants.model";

const createTenantsService = async (data: TLandlordsRequest) => {
    try {
        // Check if request already exists
        const isExistingRequest = await Request.findOne({
            tenant_ID: data.tenant_ID,
            rental_house_listing_ID: data.rental_house_listing_ID,
        });

        if (!isExistingRequest) {
            // Create a new request if it doesn't exist
            const result = await Request.create(data);
            return result;
        } else {
            console.log(isExistingRequest)
            throw Error('You have already requested this rental house.')

        }
    } catch (error) {
        console.log(error)
        throw new Error('An error occurred while processing your request.')
    }
};

export default createTenantsService;

const getAllTenantsService = async () => {

}

const getSingleTenantsService = async (id: string) => {

}

const updateTenantsService = async (id: string) => {

}

const deleteTenantsService = async (id: string) => {

}


export const TenantsService = {
    createTenantsService,
    getAllTenantsService,
    getSingleTenantsService,
    updateTenantsService,
    deleteTenantsService
}