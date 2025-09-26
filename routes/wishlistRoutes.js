import express from "express"
import {
  addToWishlist,
  deleteFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js"
const router = express.Router()

router.post("/wishlist", addToWishlist)
router.get("/wishlist", getWishlist)
router.delete("/wishlist", deleteFromWishlist)

export default router
