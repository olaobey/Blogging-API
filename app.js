const express = require("express");
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./src/api/routes/userRoute");
const blogRouter = require("./src/api/routes/blogRoute");
const authRouter = require("./src/api/routes/authRoute");
const app = express();
const db = require("./model/db");
require("dotenv").config({ path: require("./src/config/db.config")(".env") });
require("././src/services/auth")("passport");

//Importing error handling
const errorHandlerMiddleware = require("./src/middleware/errorHandler");

// Connect to MongoDB
db.connectToMongoDB();

// routes
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandlerMiddleware);
app.use("/", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome to blogging API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
