"use strict";
require("dotenv").config();
const { newsapikey } = process.env;
const NewsAPI = require("newsapi");
const newsapiRouter = require("express").Router();
const {
  newsapiRouter: { CENTER_OUTLETS, LEFT_OUTLETS, RIGHT_OUTLETS },
} = require("../data/news_orgs_grouped.json");

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
