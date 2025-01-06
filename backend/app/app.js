const express = require("express");
const morgan = require("morgan");
const songsRouter = require("../routes/staff/songsRouter");
const {
  globalErrorHandler,
  notFoundError,
} = require("../middlewares/glodalErrorHandler");


const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/songs", songsRouter);



//Error Middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;
