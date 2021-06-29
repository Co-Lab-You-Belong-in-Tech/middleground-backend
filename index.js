"use strict";
require("dotenv").config();
const { token } = process.env;
const NewsAPI = require("newsapi");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());

app.get("/searchTerm", async function (req, res) {
  const { query, view, datefrom, dateto, order } = req.query;
  try {
    var response = await querying(query, view, datefrom, dateto, order);
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }

  return res.status(200).send(response);
});

const news = new NewsAPI(token);

async function querying(term, view, datefrom, dateto, order) {
  var domains;
  const LEFT_OUTLETS =
    "bbc.co.uk,reuters.com,cbsnews.com,axios.com,nbcnews.com";
  const CENTER_OUTLETS = "apnews.com,axios.com,fortune.com";
  const RIGHT_OUTLETS = "bloomberg.com,thefiscaltimes.com,wsj.com";

  if (view === "center") {
    domains = CENTER_OUTLETS;
  } else if (view === "left") {
    domains = LEFT_OUTLETS;
  } else {
    domains = RIGHT_OUTLETS;
  }

  var response = await news.v2.everything({
    q: `${term}`,
    domains,
    language: "en",
    sortBy: order,
    from: datefrom,
    to: dateto,
  });

  return response;
}

app.listen(PORT, function () {
  console.log(`The server is online on ${PORT}. Press ctrl+c to kill it.`);
});

module.exports = { querying };
