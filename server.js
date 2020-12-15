require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(4000, () =>
  console.log('server started'))