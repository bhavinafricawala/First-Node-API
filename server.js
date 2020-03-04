const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);
  const database = client.db("notable");
  console.log(db);
  require("./app/routes")(app, database);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
