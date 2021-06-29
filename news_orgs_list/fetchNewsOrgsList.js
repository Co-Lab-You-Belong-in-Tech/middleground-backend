"use strict";
require("dotenv").config();
const { token } = process.env;
const NewsAPI = require("newsapi");
const fs = require("fs");

const news = new NewsAPI(token);

async function indexingNewsSources() {
  const response = await news.v2.sources();
  //   console.log(response);
  if (response.status === "ok") {
    // console.log(
    //   response.sources.map(function ({ id, name, description, url }) {
    //     return {
    //       id,
    //       name,
    //       description,
    //       url,
    //     };
    //   })
    // );
    fs.writeFileSync(
      "./data.json",
      JSON.stringify(
        response.sources.map(function (src) {
          return {
            name: src.name,
            url: src.url,
            description: src.description,
          };
        })
      )
    );
  }
}
indexingNewsSources();
