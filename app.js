// @Dependencies
const express = require("express");
const signinRoute = require("./routes/signin.route");
const signupRoute = require("./routes/signup.route");
const rootRoute = require("./routes/root.route");
const todoRouter = require("./routes/todo-app.route");
const auth = require("./middleware/auth.middleware");

// @Create application
const app = express();

//use data parse middelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//pug setup for view templete
app.set("view engine", "pug");

//use auth middleware
app.use(auth);

// @Use root router
app.use("/", rootRoute);

// @use static middleware
app.use(express.static(__dirname + "/views"));

// @Use signin router
app.use("/signin", signinRoute);

// @Use signup router
app.use("/signup", signupRoute);

//todo routes
app.use("/todo", todoRouter);

// @Not found route
app.use((req, res) => {
  res.status(404).sendFile(`${__dirname}/views/notFound.html`);
});

//endpoint of routes and error handling
app.use((error, req, res, next) => {
  res
    .status(500)
    .send(`<h3>Server side Error</h3>`)
});

module.exports = app;
