import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "must provide email"],
      trim: true,
    },
    passwordHash: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
})

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )
}

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.passwordHash)

  return isMatch
}

export default mongoose.model("User", userSchema)
