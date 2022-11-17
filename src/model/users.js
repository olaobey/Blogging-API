const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CONFIG = require("./../config/db.config");
//Defining a model and creating a database schema
// Define a schema for user
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      unique: true,
    },
    islogin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createVerificationToken = async function () {
  return jwt.sign(
    { username: this.username, id: this.id },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );
};

UserSchema.methods.checkPassword = async function (password) {
  const validate = await bcrypt.compare(password, this.password);
  console.log(validate);
  return validate;
};
const UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel };
