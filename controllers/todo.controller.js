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
        payload: { todo: todoData.todo, created: todoData.created,_id : todoData["_id"] },
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
        { authKey: 0, __v: 0 }
      );
      if (todoPayload.length > 0) {
        res.status(200).json({ success: true, payload: todoPayload });
      } else {
        res.status(200).json({
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

const deleteTodo = async (req,res,next)=>{
  try {
    const {id} = req.query;
    if(id){
      const todo = await Todo.deleteOne({_id : id});
      res.status(200).json({
        success : true,
        message : "Todo was delete"
      })
    }
    else{
      res.status(403).json({
        success : false,
        message : "you have problem in your request!"
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTodoPage,
  createTodo,
  findTodo,
  deleteTodo,
};
