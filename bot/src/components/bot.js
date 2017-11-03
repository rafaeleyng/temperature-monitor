const TelegramBot = require('node-telegram-bot-api')

const { NOW_URL, TELEGRAM_TOKEN } = process.env

const options = {
  webHook: {
    port: 443,
  },
}

const bot = new TelegramBot(TELEGRAM_TOKEN, options)
bot.setWebHook(`${NOW_URL}/bot${TELEGRAM_TOKEN}`)

module.exports = bot
