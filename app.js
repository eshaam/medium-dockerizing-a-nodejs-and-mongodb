const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

if(process.env.MONGO_URI) {
  console.log('yes')
  mongoose.connect(process.env.MONGO_URI, dbOptions).then( function() {
    console.log('MongoDB is connected to Atlas Cluster');
    })
    .catch( function(err) {
    console.log(err);
    });
} else {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;
  let dbUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  mongoose.connect(dbUrl, dbOptions).then( function() {
    console.log('MongoDB is connected to local');
    })
    .catch( function(err) {
    console.log(err);
  });
}

const port = process.env.PORT || 3100
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res)  {
  res.send('Hello From AWS Docker!');
});

// Starts server
app.listen(port, function() {
    console.log('Bot is listening on port ' + port)
})


