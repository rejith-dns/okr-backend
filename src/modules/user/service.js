const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const models = require("./model");
const resetPassword = models.ResetPassword;
const User = models.User;

const generateJWTtoken = async (user, expiryTime) => {
  try {
    const token = await jwt.sign(
      {
        user_id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: expiryTime,
      }
    );
    if (token) {
      return token;
    } else {
      return false;
    }
  } catch (error) {}
};

async function createReset(data) {
  try {
    let reset = await data.save();
    if (reset) {
      return reset;
    } else {
      return false;
    }
  } catch (error) {
    // logger.error(error);
  }
}

async function checkTokenResetSchema(token, inputUserId) {
  let resetPasswordEntry = await resetPassword.findOne({ token: token });
  if (resetPasswordEntry.isUsed) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return resetPasswordEntry.userId == inputUserId &&
      decoded.user_id == inputUserId
      ? decoded.user_id
      : null;
  } catch (err) {
    return null;
  }
}

async function findUserId(userId) {
  let user;
  try {
    user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    // logger.error(error);
  }
}

async function updateUser(user, id) {
  try {
      let update = await User.findByIdAndUpdate({ _id: id }, user);
      return update;
  } catch (error) {
      // logger.error(error);
  }
}

module.exports = {
  generateJWTtoken,
  createReset,
  checkTokenResetSchema,
  updateUser,
  findUserId,
};
