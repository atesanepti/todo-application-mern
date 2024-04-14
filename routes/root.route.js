// @Dependendices 
const express = require("express");
const rootRoute = express.Router();
const {
  rootController,
  getUserInfo,
  deleteCookie,
} = require("../controllers/root.controller.js");

rootRoute.get("/",rootController);
rootRoute.get("/info",getUserInfo)
rootRoute.delete("/cookie-delete", deleteCookie);
module.exports = rootRoute;