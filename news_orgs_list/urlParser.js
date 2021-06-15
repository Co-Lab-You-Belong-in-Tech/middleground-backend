"use strict";
var data = require("../data.json");
var fs = require("fs");

(function (data) {
    var orgs = [];
    for (let datum of data) {
        orgs.push(datum.url);
    }
    fs.writeFileSync("./news.json", JSON.stringify(orgs));
    var readData = fs.readFileSync("./news.json", { encoding: "utf-8" });
    console.log(readData);
})(data);
