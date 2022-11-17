const moogoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

// connect to mongodb
function connectToMongoDB() {
  const connectionParams = {
    useNewUrlparser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  moogoose.connect(MONGODB_URI, connectionParams);

  moogoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  moogoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
  });
  moogoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected");
  });
}

module.exports = { connectToMongoDB };
