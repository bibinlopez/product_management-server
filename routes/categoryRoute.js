import express from "express"
import {
  addCategory,
  addSubcategory,
  getAllCategories,
} from "../controllers/category.controller.js"
const router = express.Router()

router.post("/category", addCategory)
router.post("/subcategory", addSubcategory)
router.get("/categories", getAllCategories)

export default router
