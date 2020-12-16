require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/greetingApp', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

var schema = new mongoose.Schema({
  Name: String,
  Wish: String,
  date: Date,
})

var greetingsCollection = mongoose.model("sendgreeting", schema);

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection successful");
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/greetings.html')
})

app.post('/sendgreeting', (req, res) => {
  var name = req.body.Name
  var wish = req.body.Wish
  var date = new Date()
  var myData = new greetingsCollection({ "Name": name, "Wish": wish, "date": date });

  myData.save(function (err, document) {
    if (err) return console.error(err)
    res.send(document);
  })
})

app.get('/receivegreeting', (req, res) => {
  greetingsCollection.find({}, function (err, document) {
    if (err) return console.error(err)
    res.send(document);
  })
})

app.listen(4000, () =>
  console.log('server started'))
