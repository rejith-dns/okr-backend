const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const resetPasswordSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	validTill: { type: String },
	token: { type: String },
	isUsed: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = {
  User: mongoose.model("User", userSchema),
  ResetPassword: mongoose.model('ResetPassword', resetPasswordSchema),
};
