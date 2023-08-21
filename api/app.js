const express = require('express');
const { createError } = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bp = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.development' });

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS;

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: allowedOrigins
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const { createServer } = require('http');
const server = createServer(app);
module.exports = server;
