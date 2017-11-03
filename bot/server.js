const axios = require('axios')
const moment = require('moment')

const { API_URL, TELEGRAM_TOKEN } = process.env

const TelegramBot = require('node-telegram-bot-api')
const options = {
  webHook: {
    port: 443
  }
}

const url = process.env.NOW_URL
const bot = new TelegramBot(TELEGRAM_TOKEN, options)

bot.setWebHook(`${url}/bot${TELEGRAM_TOKEN}`)

bot.onText(/\/last (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const sensorId = match[1]

  axios.get(`${API_URL}/measurements/last/${sensorId}`)
    .then(res => {
      const data = res.data.data
      if (!data) {
        bot.sendMessage(chatId, `Unable to get information about sensor ${sensorId}`)
        return
      }

      const { temperature, timestamp } = data
      const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

      bot.sendMessage(
        chatId,
`Last temperature for sensor ${sensorId} is:

*${temperature} C°*

on ${date}`,
        { parse_mode: 'Markdown' }
      )
    })
    .catch(err => {
      console.error(err)
      bot.sendMessage(chatId, `Unable to get information about sensor ${sensorId}`)
    })
})
