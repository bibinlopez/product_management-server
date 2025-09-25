import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"
import { categorySchema, subcategorySchema } from "../models/categorySchema.js"

export const addCategory = async (req, res) => {
  const { name } = req.body
  const category = await categorySchema.create({
    name,
    createdBy: "68d56f9e98f0eb05387b497b",
  })

  return res.status(200).json({
    success: true,
    message: "Category added successfully",
    category,
  })
}

export const addSubcategory = async (req, res) => {
  const { name } = req.body

  const subcategory = await subcategorySchema.create({
    name,
    category: "68d57237c25a3a9efb6324f1",
    createdBy: "68d56f9e98f0eb05387b497b",
  })

  return res.status(200).json({
    success: true,
    message: "Subcategory added successfully",
    subcategory,
  })
}

export const getAllCategories = async (req, res) => {
  const categories = await categorySchema.find({})
  if (categories.length === 0) {
    throw new CustomError("no categories found ", 404)
  }

  return res.status(200).json({
    success: true,
    categories,
  })
}
