const express = require("express");
const blogService = require("./../.././services/blogService");
const paginationMiddleware = require("./../../middleware/sort_filter_pagination/blogPagination");

const blogRouter = express.Router();

blogRouter.get("/", paginationMiddleware(blogModel), blogService.getBlog);
blogRouter.edit("/:id", blogService.getBlogById);
blogRouter.create("/", blogService.addBlog);
blogRouter.update("/:id", blogService.updateBlog);
blogRouter.delete("/:id", blogService.deleteBlog);

module.exports = blogRouter;
