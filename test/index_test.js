"use strict";

const { describe, it } = require("mocha");
const assert = require("assert");
const { querying } = require("../index");

describe("querying", function () {
  it("returns a response object containing news article data with required properties", async function () {
    // 01 - Setup
    var expectedObjectProperties = ["status", "totalResults", "articles"];
    var date = new Date();
    var fromDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    var toDate = fromDate;

    // 02 - Exercise
    try {
      var result = await querying("", "center", fromDate, toDate);
      var resultProperties = Object.keys(result);
    } catch (error) {
      console.error(error);
    }

    // 03 - Assertion
    assert.deepStrictEqual(resultProperties, expectedObjectProperties);
  });
});
