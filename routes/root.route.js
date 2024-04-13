// @Dependendices 
const express = require("express");
const rootRoute = express.Router();
const {rootController} = require("../controllers/root.controller.js");

rootRoute.get("/",rootController);


module.exports = rootRoute;