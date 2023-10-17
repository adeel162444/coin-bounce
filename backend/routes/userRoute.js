const express = require("express");
const {
  addUser,
  validateUserInput,
  validateLoginInput,
  userLogin,
  getAllUser,
  refreshToken,
  logout,
} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.route("/register").post(validateUserInput, addUser);
userRouter.route("/login").post(validateLoginInput, userLogin);
userRouter.route("/all").get(getAllUser);
userRouter.route("/refresh_token").post(refreshToken);
userRouter.route("/logout").post(logout);
module.exports = userRouter;
