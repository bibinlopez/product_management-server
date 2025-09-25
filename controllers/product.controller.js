import CustomError from "../error/custom-error.js"
import { productSchema, variantSchema } from "../models/productSchema.js"

export const addProduct = async (req, res) => {
  const { userId } = req.user
  const { title, description, subcategoryId, variants } = req.body

  if (!title || !subcategoryId) {
    throw new CustomError("please provide productId", 400)
  }

  if (!variants.length) {
    throw new CustomError("product need atleast one vairant")
  }

  variants.forEach((vairant) => {
    const { ram, price, quatity } = vairant
    if (!ram || !price || !quatity) {
      throw new CustomError("please provide values for the variant")
    }
  })

  await productSchema.create({
    title,
    description,
    createdBy: userId,
  })
  await variantSchema.insertMany(variants)

  return res.status(200).json({
    success: true,
    message: "Product added successfully",
  })
}

export const getProducts = async (req, res) => {
  const query = req.query

  const products = await productSchema.find({
    // conditons
  })

  return res.status(200).json({
    success: true,
    products,
  })
}

export const getProduct = async (req, res) => {
  const id = req.params

  const product = await productSchema.findById(id)

  return res.status(200).json({
    success: true,
    product,
  })
}
