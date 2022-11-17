const express = require("express");
const UserModel = require("./../../model/users");
const userController = require("./../.././api/controller/usersController");
const { isAuth } = require("./../.././middleware/checkIsAuth");
const paginationMiddleware = require("./../../middleware/sort_filter_pagination/usersPagination");

const userRouter = express.Router();

userRouter.post(
  "/users",
  isAuth,
  paginationMiddleware(UserModel),
  userController.createBlog
);
userRouter.post("/users", isAuth, userController.login);
userRouter.get("/users/:userId", isAuth, userController.getAll);
userRouter.get("/users/userId", isAuth, userController.getById);
module.exports = userRouter;
