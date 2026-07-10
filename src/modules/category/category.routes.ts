import { Router } from "express";
import { auth } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();

router.post('/', auth("LANDLORD"), categoryController.createCategory)
router.get('/', categoryController.getCategories)



export const categoryRoutes = router;