const { numberParser } = require("config/parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: "string",
    required: true,
    unique: [true, "title must be unique"],
  },
  description: {
    type: "string",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  state: [
    {
      name: { type: "string", required: true },
      cities: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "state",
        },
      ],
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

module.exports = mongoose.model("Blogs", blogSchema);
