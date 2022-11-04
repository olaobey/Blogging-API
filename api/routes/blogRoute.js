const express = require("express");
const blogRoute = require("../controller/blogsController");

const blogRouter = express.Router();

blogRouter.get("/", blogController.getBlog);
userRouter.edit("/:id", blogController.getBlogById);
userRouter.create("/", blogController.addBlog);
userRouter.update("/:id", blogController.updateBlog);
userRouter.delete("/:id", blogController.deleteBlog);

module.exports = blogRouter;
