const router = require("express").Router();
const controller = require("./controller");

module.exports = {
  configure({ app }) {
    router.post("/login", controller.login);
    router.post("/signup", controller.signup);
    return router;
  },
};
