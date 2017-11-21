const bot = require('../components/bot')

module.exports = (req, res) => {
  const { chatId } = req.body
  bot.sendMessage(chatId, 'oi rafael')
  return res.send('ok')
}
