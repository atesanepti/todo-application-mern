const mongoose = require("mongoose");
const {getBDTime} = require("../lib/ops")



const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("Data Base Connection Ok");
  } catch (error) {
    console.log(error.message);
  }
};

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlenght: 4,
  },
  profile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const authSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  authKey: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
    default: getBDTime(new Date()),
  },
});

module.exports = {
  connect,
  signupSchema,
  authSchema,
  todoSchema,
};
