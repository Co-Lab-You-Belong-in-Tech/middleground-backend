function dataFormatter(responseObject) {
  for (let obj of responseObject.data) {
    let id = obj.source.toLowerCase().split(" ").join("-");
    obj.source = {
      id,
      name: obj.source,
    };

    obj.publishedAt = obj.published_at;
    obj.content = null;
    obj.urlToImage = obj.image;
    delete obj.published_at;
    delete obj.image;
  }
  var returnResponseObject = {
    status: "ok",
    totalResults: responseObject.total,
    articles: responseObject.data,
  };

  return returnResponseObject;
}

module.exports = dataFormatter;
