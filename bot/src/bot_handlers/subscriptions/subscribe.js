const log = require('../../components/logger')
const moment = require('moment')

const bot = require('../../components/bot')
const subscriptionsApi = require('../../components/subscriptionsApi')

log.info('registering subscriptions/subscribe')

bot.onText(/\/subscribe (.+)/, (msg, match) => {
  log.info('handling subscriptions/subscribe')
  const chatId = msg.chat.id
  const sensorId = match[1]

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to subscribe to sensor ${sensorId}`)

  subscriptionsApi.subscribe(sensorId, chatId)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      bot.sendMessage(chatId, `Subscribed chat ${chatId} to sensor ${sensorId}`)
    })
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
