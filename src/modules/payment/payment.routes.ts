import { Router } from "express";
import { paymentsController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/create/', auth("TENANT"), paymentsController.createPayment)
router.post('/webhook', paymentsController.handleWebhook)
router.post('/confirm/', auth("TENANT"), paymentsController.confirmPayment)
router.get('/', auth("TENANT","ADMIN","LANDLORD"), paymentsController.getPaymentHistory)
router.get('/:id', auth("TENANT","ADMIN","LANDLORD"), paymentsController.getPaymentHistoryById)

export const paymentsRoutes = router; 