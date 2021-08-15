"use strict";
require("dotenv").config();
const { token } = process.env;
const NewsAPI = require("newsapi");
const express = require("express");
const cors = require("cors");
const newsapiRouter = require("./routers/newsapiRouter");
const mediastackRouter = require("./routers/mediastackRouter");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());

app.use("/searchTerm", newsapiRouter);
// app.use("/searchTerm", mediastackRouter);

app.listen(PORT, function () {
  console.log(`The server is online on ${PORT}. Press ctrl+c to kill it.`);
});
