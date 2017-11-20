const moment = require('moment')

const bot = require('../../components/bot')
const rangesApi = require('../../components/rangesApi')

const buildMessage = (sensorId, min, max, timestamp) => {
  const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')
  return `Current range for sensor ${sensorId} is:

between *${min} C°* and *${max} C°*

set on ${date}`
}

bot.onText(/\/getrange (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const sensorId = match[1]

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to get range information about sensor ${sensorId}`)

  rangesApi.last(sensorId)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      const { min, max, timestamp } = data
      const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')

      bot.sendMessage(
        chatId,
        buildMessage(sensorId, min, max, timestamp),
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
