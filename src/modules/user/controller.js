const User = require("./model").User;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user_id : user._id,
            email
        },
        process.env.SECRET_KEY,{
            expiresIn:'30d'
        })

        user.password = undefined

        return res.status(200).json({
            success:true,
            token,
            user,
            message:'User logged successfully'
        })
    }
    return res.status(400).json({
      success: false,
      message: "Email or password is incorrect",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({
        status: 422,
        message: "User already exists.",
        success: false,
      });
    }

    const userData = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    });

    if (userData) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        userData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  login,
  signup,
};
