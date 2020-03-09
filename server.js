const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
var cors = require('cors');

const app = express();

app.use(cors());

const port = 8000;
app.use(express.json());

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);
  const database = client.db('notable');
  console.log(db);
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
