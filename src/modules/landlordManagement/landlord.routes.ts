import { Router } from "express";
import { landlordController } from "./landlord.controller";

const router = Router();

router.get('/properties',landlordController.createProperty)

export const landlordRoutes = router;