// @Dependencies 
const express = require("express");
const signinRoute = express.Router();
//signin.controller
const { signinPage, signin } = require("../controllers/signin.controller");



signinRoute.get("/", signinPage);
signinRoute.post("/", signin);





module.exports = signinRoute;