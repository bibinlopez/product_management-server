import express from "express"
import {
  addProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller.js"
const router = express.Router()

router.post("/", addProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", editProduct)

export default router
