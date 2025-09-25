import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"
import wishlistSchema from "../models/wishlistSchema.js"

export const addToWishlist = async (req, res) => {
  const { userId } = req.user
  const { productId } = req.body

  if (!productId) {
    throw new CustomError("please provide productId", 400)
  }
  await wishlistSchema.create({
    product: productId,
    user: userId,
  })
  await userSchema.findByIdAndUpdate(userId, { $inc: { count: 1 } })

  return res.status(200).json({
    success: true,
    message: "Added to wishlist successfully",
  })
}

export const getWishlist = async (req, res) => {
  const { userId } = req.user

  const wishlist = await wishlistSchema.find({ user: userId })
  if (wishlist.length === 0) {
    throw new CustomError("no items found ", 404)
  }

  return res.status(200).json({
    success: true,
    wishlist,
  })
}

export const deleteFromWishlist = async (req, res) => {
  const { userId } = req.user
  const { productId } = req.body

  const wishlist = await wishlistSchema.findOne({
    user: userId,
    product: productId,
  })

  if (!wishlist) {
    throw new CustomError("no item found ", 404)
  }

  await wishlistSchema.findByIdAndDelete(wishlist.id)

  return res.status(200).json({
    success: true,
    message: "Item removed from wishlist successfully",
    subcategory,
  })
}
