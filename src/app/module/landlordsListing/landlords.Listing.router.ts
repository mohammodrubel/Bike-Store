import { Router } from "express";
import { LandLoardsListingController } from "./landlords.Listing.controller";

const router = Router();

// Rental Listings
router.post('/listings', LandLoardsListingController.createLandloardsListing); 
router.get('/listings', LandLoardsListingController.getAllLandloardssListing); 
router.put('/listings/:id', LandLoardsListingController.getSingleLandloardsListing); 
router.delete('/listings/:id', LandLoardsListingController.deleteLandloardsListing); 

// Rental Requests
router.get('/requests', LandLoardsListingController.getAllLandloardsRequest); 
router.put('/requests/:id', LandLoardsListingController.updateLandloardsRequestService); 

export const LandLordsListing = router;

