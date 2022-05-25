const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const movieRoutes = require("./api/routes/movies");
const userRoutes = require('./api/routes/user');
const audioRoutes = require("./api/routes/audios");
const multer = require('multer');

/**
 * Mongoose connection to the MongoDb
 */
mongoose.connect(
  'mongodb+srv://adamahmad:Malammadorikfada123@cluster0.2svvk.mongodb.net/Project_work',
  {
    useNewUrlParser: true
  }
);
// Promisify everything
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, multipart/form-data, Access-Control-Request-Headers"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods,  multipart/form-data", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/movies", movieRoutes);
app.use("/audios", audioRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
