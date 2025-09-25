import mongoose from "mongoose"

export const categorySchema = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    { timestamps: true }
  )
)

export const subcategorySchema = mongoose.model(
  "Subcategory",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    { timestamps: true }
  )
)
