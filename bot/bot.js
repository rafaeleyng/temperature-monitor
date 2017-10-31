'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.end('ok')
})

app.post('/', (req, res) => {
  const {message} = req.body

  if (!message || !message.text) {
    return res.end()
  }

  const text = message.text

  axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
    chat_id: message.chat.id,
    text: text,
  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// Finally, start our server
app.listen(3000, () => {
  console.log('Telegram bot listening on port 3000!')
})
