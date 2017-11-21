const log = require('../../components/logger')
const moment = require('moment')

const bot = require('../../components/bot')
const subscriptionsApi = require('../../components/subscriptionsApi')

log.info('registering subscriptions/unsubscribe')

bot.onText(/\/unsubscribe (.+)/, (msg, match) => {
  log.info('handling subscriptions/unsubscribe')
  const chatId = msg.chat.id
  const sensorId = match[1]

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to unsubscribe to sensor ${sensorId}`)

  subscriptionsApi.unsubscribe(sensorId, chatId)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      bot.sendMessage(chatId, `Unsubscribed chat ${chatId} from sensor ${sensorId}`)
    })
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
