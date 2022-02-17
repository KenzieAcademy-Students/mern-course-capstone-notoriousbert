// import 'dotenv/config'
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import keys from "./config/keys";
import router from "./routes";
import { requestLogger, errorHandler } from "./middleware";

const createError = require("http-errors");

mongoose.connect(keys.database.url, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

const app = express();

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);

app.use(express.static(path.join(__dirname, "../../client/build")));

// api router
app.use(keys.app.apiEndpoint, router);

if (process.env.NODE_ENV === "production") {
  console.log(__dirname);
  console.log("PRODUCTION PRODUCTION");
  // app.use(express.static("client/build"));
  // app.use(express.static(path.join(__dirname, "../../client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
}

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
}


// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404, 'NotFound'))
// })


//app.use(errorHandler)


module.exports = app;
