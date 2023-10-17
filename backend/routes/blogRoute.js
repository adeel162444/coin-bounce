const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateAblog,
  deleteAblog,
} = require("../controllers/blogController");
const blogRouter = express.Router();
blogRouter.route("/new").post(createBlog);
blogRouter.route("/all").get(getAllBlogs);
blogRouter.route("/single/:id").get(getBlogById);
blogRouter.route("/update").post(updateAblog);
blogRouter.route("/delete/:id").delete(deleteAblog);
module.exports = blogRouter;
