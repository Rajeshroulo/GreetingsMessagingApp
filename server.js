require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost/greetingApp', { useUnifiedTopology: true })
  .then(client => {

    const db = client.db('greetingApp')
    const quotesCollection = db.collection('sendgreeting')

    app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/greetings.html')
})

app.post('/sendgreeting', (req, res) => {
  quotesCollection.insertOne(req.body)
  .then(result => {
    console.log(result)
  })
  .catch(error => console.error(error))
})

app.listen(4000, () =>
  console.log('server started'))
    console.log('Connected to Database')
  })
  .catch(error => console.error(error))


