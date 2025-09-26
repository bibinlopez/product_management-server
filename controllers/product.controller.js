import CustomError from "../error/custom-error.js"
import { productSchema, variantSchema } from "../models/productSchema.js"

export const addProduct = async (req, res) => {
  const { userId } = req.user
  const { title, description, subcategoryId, variants } = req.body

  if (!title || !subcategoryId) {
    throw new CustomError("please provide values", 400)
  }

  if (!variants || !variants.length) {
    throw new CustomError("product need atleast one vairant")
  }

  variants.forEach((vairant) => {
    const { ram, price, quantity } = vairant
    if (!ram || !price || !quantity) {
      throw new CustomError("please provide values for the variant")
    }
  })

  const product = await productSchema.create({
    title,
    description,
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
