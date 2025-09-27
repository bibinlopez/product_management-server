import express from "express"
import {
  addProduct,
  buyProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller.js"
const router = express.Router()

router.post("/", addProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", editProduct)
router.post("/buy", buyProduct)

export default router
