const moment = require('moment')
const parseDuration = require('parse-duration')
const ChartjsNode = require('chartjs-node')

const bot = require('../components/bot')
const measurementsApi = require('../components/measurementsApi')

const buildChart = (data) => {
  const chartJsOptions = {
    type: 'line',
    data: {
      labels: data.map(d => moment(d.timestamp).format('DD/MM - hh:mm')),
      datasets: [
        {
          data: data.map(d => d.temperature),
          label: 'Sensor temperature',
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
}

bot.onText(/\/period (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const query = match[1].split(' ')

  if (!query[0] || !query[1]) {
    bot.sendMessage(
      chatId,
      'Please follow the format: `/period sensorId fromOffset [fromOffset]`. For more information, /help',
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

  measurementsApi.period(sensorId, fromEpoch, toEpoch)
    .then(data => {
      if (!data) {
        sendErrorMessage()
        return
      }

      return buildChart(data)
    })
    .then(buffer => bot.sendPhoto(chatId, buffer))
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
