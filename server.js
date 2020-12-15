require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost/greetingApp', {
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})


app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/greetings.html')
})

app.post('/sendgreeting', (req, res) => {
  console.log(req.body)
})

app.listen(4000, () =>
  console.log('server started'))