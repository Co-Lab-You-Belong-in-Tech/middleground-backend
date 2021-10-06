"use strict";
require("dotenv").config();
const fetch = require("node-fetch");
const dataFormatter = require("../utils/dataFormatter");
const {
  mediaStackRouter: { LEFT_OUTLETS, CENTER_OUTLETS, RIGHT_OUTLETS },
} = require("../data/news_orgs_grouped.json");
const { mediastackkey } = process.env;
const mediastackRouter = require("express").Router();
const BASE_URL = `http://api.mediastack.com/v1/news?access_key=${mediastackkey}`;

mediastackRouter.get("/", async function (req, res) {
  const { query, view, datefrom, dateto, order } = req.query;
  try {
    var response = await querying(query, view, datefrom, dateto, order);
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
  res.status(200).send(response);
});

async function querying(query, view, datefrom, dateto, order) {
  var domains;
  var ALL_OUTLETS = `${LEFT_OUTLETS},${CENTER_OUTLETS}, ${RIGHT_OUTLETS}`;
  if (view === "center") {
    domains = CENTER_OUTLETS;
  } else if (view === "left") {
    domains = LEFT_OUTLETS;
  } else if (view === "all") {
    domains = ALL_OUTLETS;
  } else {
    domains = RIGHT_OUTLETS;
  }

  var response = await fetch(
    `${BASE_URL}&keywords=${query}&sources=${domains}`
  );
  response = await response.json();
  response = dataFormatter(response);
  return response;
}

module.exports = mediastackRouter;
