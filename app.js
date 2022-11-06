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

module.exports = app;
