const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

//viewprofile = http://localhost:7777/profile/view
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//editprofile = http://localhost:7777/profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!!!");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile Updated successfully... `,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

//forgotpassword = http://localhost:7777/profile/password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    loginUser.password = passwordHash;

    await loginUser.save();

    res.json("Password Updated Successfully...✅");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
