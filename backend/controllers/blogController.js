const BlogDTO = require("../dto/blogdto");
const SingleBlogDto = require("../dto/singleBlogDetails");
const { errorMessage, decodedUser } = require("../methods/helpingMethods");
const blogModel = require("../models/blogModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const commentModel = require("../models/commentModel");
//create blog

exports.createBlog = async (req, res) => {
  try {
    const { title, description, photo } = req.body;
    const author = decodedUser(req);

    if (!title || !description || !photo) {
      errorMessage(res, 400, "Please fill out all the details");
    } else {
      // read image in buffer
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
      //alloc a name
      const imageName = `${Date.now()}-${author}.png`;
      //save locally
      try {
        fs.writeFileSync(`storage/${imageName}`, buffer);
      } catch (error) {
        errorMessage(res, 400, `${error} `);
      }

      const blog = new blogModel({
        title,
        description,
        author,
        photoPath: `${process.env.SERVER_BASE_PATH}/storage/${imageName}`,
      });
      await blog.save();
      const blogDto = new BlogDTO(blog);
      res.status(201).json({
        success: true,
        message: "new blog posted",
        blog: blogDto,
      });
    }
  } catch (error) {
    errorMessage(res, 500, `${error}`);
  }
};
//get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    const dtoBlogs = [];
    for (let i = 0; i < blogs.length; i++) {
      let dto = new BlogDTO(blogs[i]);
      dtoBlogs.push(dto);
    }
    res.status(200).json({
      success: true,
      blogs: dtoBlogs,
    });
  } catch (error) {
    errorMessage(res, 500, `${error}`);
  }
};
// get a blog by id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate("author");
    const blogDetails = new SingleBlogDto(blog);
    res.status(200).json({
      success: true,
      blog: blogDetails,
    });
  } catch (error) {
    errorMessage(res, 500, `${error}`);
  }
};

//update a blog v. important
exports.updateAblog = async (req, res) => {
  try {
    const { blogId, title, description, photo } = req.body;

    // to delete previous photo we need previous photoPth stored in database,
    // fetching that data from database to get imageName and path.
    let blog;
    try {
      blog = await blogModel.findOne({ _id: blogId });
    } catch (error) {
      errorMessage(res, 500, `${error}`);
    }
    if (photo) {
      let previousPhoto = blog.photoPath;
      previousPhoto = previousPhoto.split("/").at(-1); //e.g 1222332-ds3dwe2123212.png
      fs.unlinkSync(`storage/${previousPhoto}`);
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
      const imageName = `${Date.now()}-${blog.author}.png`;
      try {
        fs.writeFileSync(`storage/${imageName}`, buffer);
      } catch (error) {
        errorMessage(res, 500, `${error}`);
      }

      blog = await blogModel.findByIdAndUpdate(blogId, {
        title,
        description,
        photoPath: `${process.env.SERVER_BASE_PATH}/storage/${imageName}`,
      });
    } else {
      blog = await blogModel.findByIdAndUpdate(blogId, {
        title,
        description,
      });
    }
    res.status(200).json({
      success: true,
      message: "bolg updated",
      blog,
    });
  } catch (error) {
    errorMessage(res, 500, `${error}`);
  }
};
//delete a blog and delete all comments of that blog
exports.deleteAblog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await blogModel.deleteOne({ _id: id });
    const deletedComment = await commentModel.deleteMany({ blog: id });
    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    errorMessage(res, 500, `${error}`);
  }
};
