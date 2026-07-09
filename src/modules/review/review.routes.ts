import { Router } from "express";
import { auth } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router= Router();

router.post('/',auth("TENANT"),reviewController.createReview)
export const reviewRoutes = router;