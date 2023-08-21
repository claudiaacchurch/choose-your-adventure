var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const bp = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config({ path: '.env.development' });
var app = express();

const allowedOrigins = ['https://frontend-phi-lyart.vercel.app'];

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: allowedOrigins
}));



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));




//route setup
app.use("/", indexRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
