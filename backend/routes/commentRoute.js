const express = require("express");
const {
  createComment,
  getComments,
} = require("../controllers/commentController");
const commentRouter = express.Router();
commentRouter.route("/create").post(createComment);
commentRouter.route("/get/:id").get(getComments);
module.exports = commentRouter;
