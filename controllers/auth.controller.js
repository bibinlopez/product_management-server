import CustomError from "../error/custom-error.js"
import userSchema from "../models/userSchema.js"

export const signup = async (req, res) => {
  const user = await userSchema.create({
    passwordHash: req.body.password,
    ...req.body,
  })

  const token = await user.createJWT()
  return res.status(200).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      wishlistCount: user.wishlistCount,
    },
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await userSchema.findOne({ email })

  if (!user) {
    throw new CustomError("User Not Found", 404)
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomError("Password does not match", 401)
  }

  const token = user.createJWT()

  return res.status(200).json({
    success: true,
    message: "User logged-In successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      wishlistCount: user.wishlistCount,
    },
  })
}
