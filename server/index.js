const express = require('express')
const app = express()

app.get('/sensor/:clientId', function (req, res) {
  const clientId = req.params.clientId
  const temperature = req.query.temperature
  console.log(`client: ${clientId} - temperature: ${temperature}`)
  res.end()
})

const port = 3000

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
