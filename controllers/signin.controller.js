// @Dependencies
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User } = require("./signup.controller");
const { tokenGen } = require("../lib/ops");
const { authSchema } = require("../models/model.utiles");

//create session model in same db
const Session = mongoose.model("session", authSchema);

const signinPage = (req, res, next) => {
  try {
    if (!req.auth) {
      res.status(200).sendFile(path.join(__dirname, "../views/signin.html"));
    } else {
      res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userData = await User.find({ email });
      if (userData.length > 0) {
        const userId = userData[0]["_id"];
        const userAuthKey = await Session.find({ id: userId });
        if (userAuthKey.length > 0) {
          const hashedPass = await bcrypt.compare(
            password,
            userData[0].password
          );
          if (hashedPass) {
            res.cookie("auth-key", userAuthKey[0].key);
            res.status(200).redirect("/");
          }
          else{
            res.redirect("/signin");
          }
        } else {
          const hashedPass = await bcrypt.compare(
            password,
            userData[0].password
          );
          if (hashedPass) {
            const newSession = new Session({
              key: tokenGen(35),
              id: userData[0]._id,
            });
            const sessionData = await newSession.save();
            res.cookie("auth-key", sessionData.key);
            res.status(200).redirect("/");
          } else {
            res.redirect("/signin");
          }
        }
      } else {
        res.redirect("/signin");
      }
    } else {
      res.redirect("/signin")
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  Session,
  signinPage,
  signin,

};
