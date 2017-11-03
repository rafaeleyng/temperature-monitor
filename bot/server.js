const axios = require('axios')
const moment = require('moment')
const parseDuration = require('parse-duration')
const ChartjsNode = require('chartjs-node')

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

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to get information about sensor ${sensorId}`)

  axios.get(`${API_URL}/measurements/last/${sensorId}`)
    .then(res => {
      const data = res.data.data
      if (!data) {
        sendErrorMessage()
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
      sendErrorMessage()
    })
})

bot.onText(/\/range (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const query = match[1].split(' ')

  if (!query[0] || !query[1]) {
    bot.sendMessage(
      chatId,
      'Please follow the format: `/range sensorId fromOffset [fromOffset]`. For more information, /help',
      { parse_mode: 'Markdown' }
    )
    return
  }

  if (!query[2]) {
    query[2] = '1s'
  }

  const [ sensorId, fromOffset, toOffset ] = query

  const now = Date.now()
  const fromEpoch = now - parseDuration(fromOffset)
  const toEpoch = now - parseDuration(toOffset)

  const sendErrorMessage = () => bot.sendMessage(chatId, `Unable to get information about sensor ${sensorId}`)

  axios.get(`${API_URL}/measurements/range/${sensorId}?from=${fromEpoch}&to=${toEpoch}`)
    .then(res => {
      const data = res.data.data
      if (!data) {
        sendErrorMessage()
        return
      }

      var chartJsOptions = {
        type: 'line',
        data: {
          labels: data.map(d => moment(d.timestamp).format('DD/MM/YY hh:mm:ss')),
          datasets: [
            {
              label: "Sensor temperature",
              backgroundColor: 'rgba(54, 162, 235, 1)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: data.map(d => d.temperature),
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 10,
                  suggestedMax: 30,
                }
              },
            ],
          },
        },
      }

      const minWidth = 600
      const maxWidth = 1200
      let width = data.length * 10
      width = Math.max(minWidth, width)
      width = Math.min(maxWidth, width)

      const chartNode = new ChartjsNode(width, 600)
      return chartNode.drawChart(chartJsOptions).then(() => chartNode.getImageBuffer('image/png'))
    })
    .then(buffer => bot.sendPhoto(chatId, buffer))
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
