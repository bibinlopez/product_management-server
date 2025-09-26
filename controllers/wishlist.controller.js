import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"
import wishlistSchema from "../models/wishlistSchema.js"

export const addToWishlist = async (req, res) => {
  const { userId } = req.user
  const { variantId } = req.body

  if (!variantId) {
    throw new CustomError("please provide variantId", 400)
  }
  await wishlistSchema.create({
    variant: variantId,
    user: userId,
  })

  return res.status(200).json({
    success: true,
    message: "Added to wishlist successfully",
  })
}

export const getWishlist = async (req, res) => {
  const { userId } = req.user

  const wishlist = await wishlistSchema
    .find({ user: userId })
    .populate({ path: "variant", populate: { path: "product" } })

  const count = wishlist.length

  return res.status(200).json({
    success: true,
    wishlist: { count, data: wishlist },
  })
}

export const deleteFromWishlist = async (req, res) => {
  const { userId } = req.user
  const { variantId } = req.body

  const wishlist = await wishlistSchema.findOne({
    user: userId,
    variant: variantId,
  })

  if (!wishlist) {
    throw new CustomError("Item does not exists in your wishlist", 404)
  }

  await wishlistSchema.findByIdAndDelete(wishlist.id)

  return res.status(200).json({
    success: true,
    message: "Item removed from wishlist successfully",
  })
}
