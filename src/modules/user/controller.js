const User = require("./model").User;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const services = require("./service");
const sendEmail = require("../../utils/mailer.service");
const path = require("path");
const moment = require("moment");
const resetPassword = require("./model").ResetPassword;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          message: "Please verify your email.",
        });
      }
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      user.password = undefined;

      return res.status(200).json({
        success: true,
        token,
        user,
        message: "User logged successfully",
      });
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with given email does not exist.",
      });
    }

    const token = await services.generateJWTtoken(user, "1d");

    const link = `https://okr-frontend.herokuapp.com/reset-password/${user._id}?token=${token}`;

    ejs.renderFile(
      path.join(__dirname, "../../views/reset-password.ejs"),
      {
        link: link,
      },
      async function (err, data) {
        if (err) {
          // logger.error(err);
        } else {
          let isEmail = await sendEmail(user.email, "Password reset", data);
          if (isEmail) {
            let userId = user._id;
            let currentDate = moment();
            var new_date = moment(currentDate).add(1, "days");
            const validTill = new_date.format("x");
            const resetPassword1 = new resetPassword({
              userId,
              token,
              validTill,
            });
            let reset = await services.createReset(resetPassword1);
            res.status(200).json({
              message: "password reset link sent to your email account",
            });
          } else {
            res.status(400).json({ message: "Email not sent" });
          }
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const userResetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    let id = req.params.id;
    let userId = await services.checkTokenResetSchema(token, id);
    if (userId) {
      let user = await services.findUserId(id);
      if (user) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        let result = await services.updateUser(user, id);
        await resetPassword.findOneAndUpdate(
          { token: token },
          { isUsed: true }
        );
        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "This link has already been used!" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await services.findUserId(id);
    if (user) {
      const { firstName, lastName } = req.body;
      user.firstName = firstName;
      user.lastName = lastName;
      let result = await services.updateUser(user, id);
      if(result) {
        return res.status(200).json({ message: "User updated successfully." });
      }
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getUSerDetails = async (req, res) => {
  try{
    let user = await services.findUserId(req.user._id);
    if(user){
      user.password = null;
      return res.status(200).json({ success:true, user });
    }else{
      return res.status(404).json({ message: "user not found" });
    }
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
module.exports = {
  login,
  signup,
  forgotPassword,
  userResetPassword,
  updateUser,
  getUSerDetails
};
