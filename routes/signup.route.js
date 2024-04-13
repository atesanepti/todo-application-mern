// @Dependencies
const express = require("express");
const multer = require("multer");
const {
  getSignupPage,
  createUser,
} = require("../controllers/signup.controller");
const signupRoute = express.Router();

//multer set for file handling
// const storage = multer.diskStorage({
//   destination : (req,file,cb)=>{
//     cb(null,"./uploads/")
//   },
//   filename : (req,file,cb)=>{
//     console.log(file);
//     cb(null,"ok.png")
//   }
// });
// const upload = multer({ dest : "./upload/" });



signupRoute.get("/", getSignupPage);
signupRoute.post("/", createUser);

module.exports = signupRoute;
