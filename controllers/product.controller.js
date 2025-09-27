import CustomError from "../error/custom-error.js"
import { productSchema, variantSchema } from "../models/productSchema.js"
import wishlistSchema from "../models/wishlistSchema.js"

export const addProduct = async (req, res) => {
  const { userId } = req.user
  const { title, description, subcategoryId, variants, images } = req.body

  if (!title || !subcategoryId) {
    throw new CustomError("please provide values", 400)
  }

  if (!variants || !variants.length) {
    throw new CustomError("product need atleast one vairant")
  }

  variants.forEach((vairant) => {
    const { ram, price, quantity } = vairant
    if (!ram || !price || !quantity) {
      throw new CustomError("please provide values for the variant", 400)
    }
  })

  const product = await productSchema.create({
    title,
    description,
    images,
    tempPrice: variants[0]?.price, //set tempPrice
    subcategory: subcategoryId,
    createdBy: userId,
  })

  const variantsList = variants.map((vairant) => {
    const { ram, price, quantity } = vairant
    if (!ram || !price || !quantity) {
      throw new CustomError("please provide values for the variant")
    }
    return { createdBy: userId, product: product.id, ...vairant }
  })

  await variantSchema.insertMany(variantsList)

  return res.status(200).json({
    success: true,
    message: "Product added successfully",
  })
}

export const getProducts = async (req, res) => {
  let { subcategoryIds, search = "", limit = 10, page = 1 } = req.query

  let queryObject = { title: { $regex: search ? search : "", $options: "i" } }
  subcategoryIds = JSON.parse(subcategoryIds)

  if (subcategoryIds.length > 0) {
    queryObject.subcategory = { $in: subcategoryIds }
  }

  const products = await productSchema
    .find(queryObject)
    .skip((page - 1) * limit)
    .limit(limit)

  return res.status(200).json({
    success: true,
    products,
  })
}

export const getProduct = async (req, res) => {
  const { userId, name } = req.user

  const { id } = req.params

  const product = await productSchema.findById(id)

  if (!product) {
    throw new CustomError("product product not found", 404)
  }

  const variants = await variantSchema.find({ product: product.id })

  const varientIds = variants.map((vairant) => vairant.id)

  const wishlist = await wishlistSchema.find({
    user: userId,
    variant: { $in: varientIds },
  })
  console.log({ wishlist })

  let newVarients = [...variants]
  if (wishlist.length) {
    const wishlistIds = wishlist.map((wishlist) =>
      wishlist.variant._id.toString()
    )

    newVarients = variants.map((variant) => {
      if (wishlistIds.includes(variant._id.toString())) {
        const { _id, price, quantity, ram } = variant

        return { _id, price, quantity, ram, wishlist: true }
      } else return variant
    })
  }

  return res.status(200).json({
    success: true,
    product,
    variants: newVarients,
  })
}

export const editProduct = async (req, res) => {
  const { userId } = req.user
  const id = req.params
  const { vairants, ...productData } = req.body

  const product = await productSchema.findById(id)
  if (!product) {
    throw new CustomError("product product not found", 404)
  }
  await productSchema.findByIdAndUpdate(product.id, {
    ...productData,
    updatedBy: userId,
  })

  const existingvariants = await variantSchema.find({ product: product.id })

  for (const existingvariant of existingvariants) {
    for (const variant of vairants) {
      const { ram, price, quantity } = variant
      if (existingvariant.id === variant.id) {
        await variantSchema.findByIdAndUpdate(variant.id, {
          ram,
          price,
          quantity,
        })
      }
    }
  }

  return res.status(200).json({
    success: true,
    product,
  })
}

export const buyProduct = async (req, res) => {
  const { variantId, quantity } = req.body
  console.log(variantId)

  const varient = await variantSchema.findById(variantId)

  if (!varient) {
    throw new CustomError("varient not found!!!", 404)
  }

  if (varient.quantity === 0) {
    throw new CustomError("Variant stock out!!!", 404)
  }

  if (varient.quantity < quantity) {
    throw new CustomError(`only ${varient.quantity} left...`, 404)
  }

  await variantSchema.findByIdAndUpdate(variantId, {
    quantity: varient.quantity - quantity,
  })

  return res.status(200).json({
    success: true,
    message: "Order Place Successfully...",
  })
}
