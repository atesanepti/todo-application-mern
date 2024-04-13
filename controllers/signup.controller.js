// @Dependencies
const path = require("path");
const mongoose = require("mongoose");
const { signupSchema } = require("../models/model.utiles");
const bcrypt = require("bcrypt");

//create model for signup
const User = mongoose.model("user", signupSchema);

const getSignupPage = (req, res, next) => {
  try {
    if(!req.auth){
      res.status(200).sendFile(path.join(__dirname, "../views/signup.html"));
    }
    else{
      res.status(200).redirect("/");
    }   
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    if (fullName && email && password) {
      const newUser = new User({
        fullName,
        email,
        password: hashedPass,
        profile: "file",
      });
      const userData = await newUser.save();
      res.status(201).redirect("./signin");
    }
    else{
      res.redirect("/signup")
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  User,
  getSignupPage,
  createUser,
};
