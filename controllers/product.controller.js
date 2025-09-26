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
      throw new CustomError("please provide values for the variant", 400)
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
  const { subcategoryIds = [], search = "", limit = 10, page = 1 } = req.query

  let queryObject = { title: { $regex: search ? search : "", $options: "i" } }

  if (subcategoryIds.length > 0) {
    queryObject.subcategory = subcategoryIds
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
  const { id } = req.params

  const product = await productSchema.findById(id)

  if (!product) {
    throw new CustomError("product product not found", 404)
  }

  const variants = await variantSchema.find({ product: product.id })

  return res.status(200).json({
    success: true,
    product,
    variants,
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
