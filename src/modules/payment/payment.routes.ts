import { Router } from "express";
import { paymentsController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/create/', auth("TENANT"), paymentsController.createPayment)

export const paymentsRoutes = router; 