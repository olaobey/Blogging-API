const express = require("express");
const cors = require("cors");
const passport = require("passport");
const usersRoute = require("./api/routes/userRoute");
const blogsRoute = require("./api/routes/blogRoute");

const authRouter = require("./api/routes/auth_route");
const app = express();
const db = require("./model/db");
const { response } = require("express");
require("dotenv").config();
require("./middleware/auth");

// Connect to MongoDB
db.connectToMongoDB();

// routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), usersRoute);
app.use("/blogs", blogsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to blogging API!");
});

// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

function paginatedResults(blogs) => {
  return (req, res, next) => {
    res.paginatedResults = total
  }
}

module.exports = app;

router.get("/articles", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let article = req.query.article || "All";

    const articleOptions = [];
    article === "All"
      ? (article = [...articleOptions])
      : (article = req.query.article.split(","));
    req.query.sort ? (sort = req.query.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const blogs = await blogs
      .find({ name: { $regex: search, $options: "i" } })
      .where("article")
      .in([...article])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await blogs.countDocuments({
      article: { $in: [...article] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      articles: articleOptions,
      blogs,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
