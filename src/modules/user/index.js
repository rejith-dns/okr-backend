const router = require("express").Router();
const controller = require("./controller");
const validator = require("./validator");
const authguard = require("../../../middleware/authGuard");

module.exports = {
  configure({ app }) {
    router.post("/login", validator.login, controller.login);
    router.post("/signup", validator.signup, controller.signup);
    router.post(
      "/forgotpassword",
      validator.sendEmail,
      controller.forgotPassword
    );
    router.put(
      "/resetpassword/:id",
      validator.resetPassword,
      controller.userResetPassword
    );
    router.put("/updateUser/:id",authguard, validator.updateUser, controller.updateUser);
    router.get('/me',authguard, controller.getUSerDetails);
    router.get('/get-all-users',authguard, controller.getAllUsers);
    return router;
  },
};
