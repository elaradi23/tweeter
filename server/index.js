"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const moment        = require('moment');
const nodeSassMiddleware = require('node-sass-middleware');

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

var srcPath = __dirname + '/../sass';
var destPath = __dirname + '/../public/styles';

app.use('/styles', nodeSassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: "expanded"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  //
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets/", tweetsRoutes);
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
