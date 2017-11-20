const moment = require('moment')

const bot = require('../../components/bot')
const rangesApi = require('../../components/rangesApi')

const buildMessage = (sensorId, temperature, timestamp) => {
  const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')
  return `Last temperature for sensor ${sensorId} is:

*${temperature} C°*

on ${date}`
}

bot.onText(/\/range (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const query = match[1].split(' ')

  if (!query[0] || !query[1] || !query[2]) {
    bot.sendMessage(
      chatId,
      'Please follow the format: `/range sensorId minTemperature maxTemperature`. For more information, /help',
      { parse_mode: 'Markdown' }
    )
    return
  }

  const [ sensorId, minStr, maxStr ] = query
  const min = parseInt(minStr)
  const max = parseInt(maxStr)

  if (min > max) {
    bot.sendMessage(
      chatId,
      'Minimum temperature should be colder than maximum.',
      { parse_mode: 'Markdown' }
    )
    return
  }

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to set range for sensor ${sensorId}`)

  rangesApi.submit(sensorId, min, max)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      const { temperature, timestamp } = data
      const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')

      bot.sendMessage(
        chatId,
        `Range set for sensor ${sensorId}`
      )
    })
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
