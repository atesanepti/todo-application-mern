// @Dependencies
const express = require("express");
const todoRouter = express.Router();
const {
  getTodoPage,
  createTodo,
  findTodo,
} = require("../controllers/todo.controller");


todoRouter.get("/", getTodoPage);
todoRouter.post("/create", createTodo);
todoRouter.get("/find",findTodo)

module.exports = todoRouter;