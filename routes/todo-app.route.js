// @Dependencies
const express = require("express");
const todoRouter = express.Router();
const {
  getTodoPage,
  createTodo,
  findTodo,
  deleteTodo
} = require("../controllers/todo.controller");


todoRouter.get("/", getTodoPage);
todoRouter.post("/create", createTodo);
todoRouter.get("/find",findTodo)
todoRouter.delete("/remove", deleteTodo);


module.exports = todoRouter;