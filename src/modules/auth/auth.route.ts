import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/register',authController.createUser)
router.post('/login',authController.loginUser)
router.get('/me',auth("ADMIN","LANDLOARD","TENANT"), authController.getMyProfile)

export const authRoutes = router;