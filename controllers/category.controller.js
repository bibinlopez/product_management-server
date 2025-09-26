import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"
import { categorySchema, subcategorySchema } from "../models/categorySchema.js"

export const addCategory = async (req, res) => {
  const { userId } = req.user
  const { name } = req.body

  if (!name) {
    throw new CustomError("please provide value", 400)
  }

  const category = await categorySchema.create({
    name,
    createdBy: userId,
  })

  return res.status(200).json({
    success: true,
    message: "Category added successfully",
    category,
  })
}

export const addSubcategory = async (req, res) => {
  const { userId } = req.user
  const { name, categoryId } = req.body

  if (!name || !categoryId) {
    throw new CustomError("please provide values", 400)
  }

  const subcategory = await subcategorySchema.create({
    name,
    category: categoryId,
    createdBy: userId,
  })

  return res.status(200).json({
    success: true,
    message: "Subcategory added successfully",
    subcategory,
  })
}

export const getAllCategoriesSubcategories = async (req, res) => {
  const categories = await categorySchema.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "_id",
        foreignField: "category",
        as: "subcategories",
      },
    },
  ])
  if (categories.length === 0) {
    throw new CustomError("no categories found ", 404)
  }

  return res.status(200).json({
    success: true,
    categories,
  })
}

export const getAllCategories = async (req, res) => {
  const categories = await categorySchema.find()

  return res.status(200).json({
    success: true,
    categories,
  })
}
