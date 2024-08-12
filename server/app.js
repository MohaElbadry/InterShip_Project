var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var indexRouter = require("./routes/auth");
var usersRouter = require("./routes/userRoutes");
var accidentRoutes = require("./routes/accidentRoutes");
var accidentVehicleRoutes = require("./routes/accidentVehicleRoutes");
var claimRoutes = require("./routes/claimRoutes");
var insurancePolicyRoutes = require("./routes/insurancePolicyRoutes");
var vehicleRoutes = require("./routes/vehicleRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// ========> Routing <=============//
// app.use("/user", authMiddleware, usersRouter); For auth all the router
// Public Routes
app.use("/", indexRouter);
// Public and Private routes
app.use("/insurance", insurancePolicyRoutes);
// Private Routes Need auth
app.use("/user", usersRouter);
app.use("/accident", authMiddleware, accidentRoutes);
app.use("/accident-vehicle", authMiddleware, accidentVehicleRoutes);
app.use("/vehicle", authMiddleware, vehicleRoutes);
app.use("/claim", authMiddleware, claimRoutes);
// ========> End Routing <=============//
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
