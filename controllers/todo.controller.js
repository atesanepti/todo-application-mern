// @Dependencies
const mongoose = require("mongoose");
const path = require("path");
const { todoSchema } = require("../models/model.utiles");

//create model for todo
const Todo = mongoose.model("todo", todoSchema);

const getTodoPage = (req, res, next) => {
  try {
    if (req.auth) {
      res.status(200).sendFile(path.join(__dirname, "../views/todo.html"));
    } else {
      res.status(200).redirect("/signin");
    }
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { todo, authKey } = req.body;
    if (todo && authKey) {
      const newTodo = new Todo({
        todo,
        authKey,
      });
      const todoData = await newTodo.save();

      res.status(201).json({
        success: true,
        payload: { todo: todoData.todo, created: todoData.created },
        message: "your data successfuly added",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "you have a problem in your request!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const findTodo = async (req, res, next) => {
  try {
    const { authKey } = req.query;
    if (authKey) {
      const todoPayload = await Todo.find(
        { authKey },
        { _id: 0, authKey: 0, __v: 0 }
      );
      if (todoPayload.length > 0) {
        res.status(200).json({ success: true, payload: todoPayload });
      } else {
        res.status(404).json({
          success: false,
          payload: [],
          message: "Todo not found",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "your have problem in your request!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodoPage,
  createTodo,
  findTodo,
};
