import mongoose from "mongoose"

export const productSchema = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      images: [
        {
          type: String,
          required: false,
        },
      ],
      subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      tempPrice: {
        type: Number,
        required: false,
      },
    },
    { timestamps: true }
  )
)
export const variantSchema = mongoose.model(
  "Variant",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: false,
      },
      ram: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  )
)
