const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid!!!!");
      }
    },
  },
  password: {
    type: String,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please enter a Strong Password!!!!");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  photoUrl: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Url is not valid!!!");
      }
    },
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender is not valid!!!");
      }
    },
  },
  skill: {
    type: Array,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, "Darshan@123", { expiresIn: "1h" });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordhash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordhash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
