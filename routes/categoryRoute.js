import express from "express"
import {
  addCategory,
  addSubcategory,
  getAllCategories,
  getAllCategoriesSubcategories,
  getAllSubcategories,
} from "../controllers/category.controller.js"
const router = express.Router()

router.post("/category", addCategory)
router.post("/subcategory", addSubcategory)
router.get("/categories-subcategories", getAllCategoriesSubcategories)
router.get("/categories", getAllCategories)
router.get("/subcategories", getAllSubcategories)

export default router
