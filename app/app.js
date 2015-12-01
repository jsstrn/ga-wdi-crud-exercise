const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// connect to database
const dbuser = process.env.SCOREBOARD_DB_USER
const dbpassword = process.env.SCOREBOARD_DB_PASSWORD
const dburl = 'mongodb://' + dbuser + ':' + dbpassword + '@ds061954.mongolab.com:61954/scoreboard'
mongoose.connect(dburl)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))

// define mongoose model (schema)
const Score = mongoose.model('Score', {
  "player": String,
  "score": Number
})

// read local data
const scoreboard = require('../data/scoreboard.json')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/scores', (req, res) => {
  res.json(scoreboard)
})

app.get('/scores/:id', (req, res) => {
  const score = scoreboard[req.params.id]
  res.json(score)
})

// create
app.post('/scores', (req, res) => {
  const score = new Score(req.body)
  score.save(err => {
    if (err) return console.error(err)
    console.log('New score added.')
    res.json(req.body)
  })
  // scoreboard.push(req.body)
})

// update
app.put('/scores/:id', (req, res) => {
  scoreboard[req.params.id] = req.body
  res.json(scoreboard[req.params.id])
})

// delete
app.delete('/scores/:id', (req, res) => {
  delete scoreboard[Number(req.params.id)]
  res.send(scoreboard)
})

module.exports = app
