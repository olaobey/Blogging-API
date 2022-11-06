const express = require("express");
const blogModel = require("../../model/blogs");

const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
  userModel
    .find()
    .then((blogs) => {
      res.status(200).send({
        message: "All blog entries are gotten",
        data: blogs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

blogRouter.edit("/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((blog) => {
      res.status(200).send({
        message: "You Have successfully gotten the blog",
        data: blog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

blogRouter.create("/", (req, res) => {
  const blog = req.body;
  blog.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  userModel
    .create(blog)
    .then((blog) => {
      res.status(201).send({
        message: "Blog updated successfully",
        data: blog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

blogRouter.update("/:id", (req, res) => {
  const id = req.params.id;
  const blog = req.body;
  blog.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  userModel
    .findByIdAndUpdate(id, blog, { new: true })
    .then((newBlog) => {
      res.status(200).send({
        message: "Blog created successfully",
        data: newBlog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

blogRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndRemove(id)
    .then((blog) => {
      res.status(200).send({
        message: "Blog deleted successfully",
        data: blog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = blogRouter;
