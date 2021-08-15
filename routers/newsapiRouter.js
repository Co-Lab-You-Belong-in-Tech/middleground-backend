"use strict";
require("dotenv").config();
const { newsapikey } = process.env;
const NewsAPI = require("newsapi");
const newsapiRouter = require("express").Router();

const news = new NewsAPI(newsapikey);

newsapiRouter.get("/", async function (req, res, next) {
  const { query, view, datefrom, dateto, order } = req.query;
  try {
    var response = await querying(query, view, datefrom, dateto, order);
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
  if (response.status === "ok" && response.totalResults === 0) {
    next();
  }
  return res.status(200).send(response);
});
async function querying(term, view, datefrom, dateto, order) {
  var domains;
  const LEFT_OUTLETS = "bbc.co.uk,reuters.com,cbsnews.com,nbcnews.com";
  const CENTER_OUTLETS = "apnews.com,axios.com,fortune.com,aljazeera.com";
  const RIGHT_OUTLETS = "bloomberg.com,thefiscaltimes.com,wsj.com";
  const ALL_OUTLETS = `${LEFT_OUTLETS},${RIGHT_OUTLETS},${CENTER_OUTLETS}`;

  if (view === "center") {
    domains = CENTER_OUTLETS;
  } else if (view === "left") {
    domains = LEFT_OUTLETS;
  } else if (view === "all") {
    domains = ALL_OUTLETS;
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

module.exports = newsapiRouter;
