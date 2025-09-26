import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"

export const getProfile = async (req, res) => {
  const { userId } = req.user

  const user = await userSchema.findById(userId)

  return res.status(200).json({
    success: true,
    user,
  })
}
