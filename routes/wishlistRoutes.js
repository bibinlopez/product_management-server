import express from "express"
import {
  addToWishlist,
  deleteFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js"
const router = express.Router()

router.post("/", addToWishlist)
router.get("/", getWishlist)
router.delete("/", deleteFromWishlist)

export default router
