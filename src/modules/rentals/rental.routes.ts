import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/',auth("TENANT"),rentalController.createRentalRequest)
router.get('/',auth("TENANT"),rentalController.getAllRentalRequests)
router.get('/:id',auth("TENANT"),rentalController.getRentalRequestById)

export const rentalRoutes = router;
