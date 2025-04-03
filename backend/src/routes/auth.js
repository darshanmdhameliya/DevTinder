const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const user = require("../models/user");

const authRouter = express.Router();

//signup
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordhash,
    });

    await user.save();

    res.send("User add Successfully....✅");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("emailId not present at DB!!!!");
    }

    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      const token = await user.getJWT();

      if (!token) {
        throw new Error("token not valid!!!");
      }

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("User login successfully...✅");
    } else {
      throw new Error("Password not valid!!!");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//logout
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.send("User logout successfully...✅");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
