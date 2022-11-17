const mongoose = require("mongoose");

//Defining a model and creating a database schema
//Defining blog schema

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: "string",
    required: [true, "Blog title required"],
    default: "untitled blog",
    unique: [true, "title must be unique"],
  },
  description: {
    type: "string",
    required: [true, "Blog description required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  state: [
    {
      name: { type: "string", required: true },
      cities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "state",
      },
    },
  ],
  read_count: {
    type: "number",
    required: true,
    default: 0,
  },
  read_time: {
    type: "date",
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Tag",
    },
  ],
  body: {
    type: "string",
    required: true,
  },
  timestamp: { type: "date", required: true },
});

const BlogModel = mongoose.model("Blog", blogSchema);
module.exports = BlogModel;
