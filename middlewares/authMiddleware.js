import jwt from "jsonwebtoken"
import CustomError from "../error/custom-error.js"

const authMiddleware = async (req, res, next) => {
  const auth = req.headers["authorization"]

  if (!auth || !auth.startsWith("Bearer")) {
    throw new CustomError("No token found", 401)
  }

  const token = auth.split("Bearer ")[1]

  let payload

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new CustomError("Invalid Token", 401)
  }

  const { userId, name } = payload

  req.user = { userId, name }

  next()
}

export default authMiddleware
