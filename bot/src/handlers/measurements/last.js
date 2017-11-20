const moment = require('moment')

const bot = require('../../components/bot')
const measurementsApi = require('../../components/measurementsApi')

const buildMessage = (sensorId, temperature, timestamp) => {
  const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')
  return `Last temperature for sensor ${sensorId} is:

*${temperature} C°*

on ${date}`
}

bot.onText(/\/last (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const sensorId = match[1]

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to get information about sensor ${sensorId}`)

  measurementsApi.last(sensorId)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      const { temperature, timestamp } = data
      const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')

      bot.sendMessage(
        chatId,
        buildMessage(sensorId, temperature, timestamp),
        {
          parse_mode: 'Markdown',
        }
      )
    })
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
