import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/properties',auth("LANDLORD"),landlordController.createProperty)
router.get('/properties',landlordController.getAllProperties)
router.get('/properties/:id',landlordController.getPropertyById)
router.put('/properties/:id',landlordController.UpdateProperty)
router.delete('/properties/:id',landlordController.DeleteProperty)
router.get('/requests/',auth("LANDLORD"),landlordController.getAllRentalRequests)
router.patch('/requests/:id',auth("LANDLORD"),landlordController.updateRentalRequestById)

export const landlordRoutes = router;