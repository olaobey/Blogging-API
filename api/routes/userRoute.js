const express = require("express");
const userController = require("../controller/usersController");

const userRouter = express.Router();

userRouter.get("/", userController.getBlogs);
userRouter.get("/:id", userController.getBlogById);
userRouter.post("/", userController.addBlog);
userRouter.put("/:id", userController.updateBlog);
userRouter.delete("/:id", userController.deleteBlog);

module.exports = userRouter;
