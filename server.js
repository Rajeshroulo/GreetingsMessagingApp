require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/greetingApp', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

var greetingSchema = new mongoose.Schema({
  Name: String,
  Wish: String,
  date: Date,
})

var greetingsCollection = mongoose.model("sendgreeting", greetingSchema);

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log("connection successful");
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/greetings.html')
})

app.put('/editgreeting', (req, res) => {
  var name = req.body.Name
  var wish = req.body.Wish
  var id ={"_id":mongoose.Types.ObjectId(req.body.Id)}
  var date = new Date()
  var myData =  {$set: {"Name": name, "Wish": wish, "date": date }};
  

  greetingsCollection.update(id,myData,function (err, document) {
    if (err) return console.error(err)
    console.log("Record updated Successfully");
    res.status(200).json({ message: 'success' });  })
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

app.post('/deletegreeting', (req, res) => {
  var id ={"_id":mongoose.Types.ObjectId(req.body.Id)}    

  greetingsCollection.remove(id,function (err, document) {
    if (err) return console.error(err)
    console.log("Record deleted Successfully");
    res.status(200).json({ message: 'success' });  })
})

app.listen(4000, () =>
  console.log('server started'))
