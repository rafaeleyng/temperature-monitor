const TelegramBot = require('node-telegram-bot-api')

const { TELEGRAM_TOKEN } = process.env

const bot = new TelegramBot(TELEGRAM_TOKEN)

module.exports = bot
