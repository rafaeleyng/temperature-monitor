const moment = require('moment')
const bot = require('../components/bot')

const buildMessage = ({ sensorId, temperature, timestamp, min, max }) => {
  const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss')
  return `Heads up! Your sensor ${sensorId} is configured to stay between ${min} C° and ${max} C°, but it reported

*${temperature} C°*

on ${date}`
}

module.exports = (req, res) => {
  const { chatId } = req.body
  bot.sendMessage(
    chatId,
    buildMessage(req.body),
    {
      parse_mode: 'Markdown',
    }
  )
  return res.send('ok')
}
