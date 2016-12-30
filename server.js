var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.post('/start', require('./src/start'))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

app.listen(3001, function () {
  console.log('app listening on port 3001!')
})
