import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/properties',auth("LANDLORD"),landlordController.createProperty)

export const landlordRoutes = router;