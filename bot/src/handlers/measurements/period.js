const moment = require('moment')
const parseDuration = require('parse-duration')
const ChartjsNode = require('chartjs-node')

const bot = require('../../components/bot')
const measurementsApi = require('../../components/measurementsApi')
const rangesApi = require('../../components/rangesApi')

const buildChart = (measurementsData, rangeData = {}) => {
  const datasets = [
    {
      data: measurementsData.map(d => d.temperature),
      label: 'sensor',
      backgroundColor: 'rgba(75, 192, 192, 1)',
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
    },
  ]

  if (rangeData.min) {
    datasets.push({
      data: measurementsData.map(d => rangeData.min),
      label: 'min',
      backgroundColor: 'rgba(54, 162, 235, 1)',
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false,
    })
  }

  if (rangeData.max) {
    datasets.push({
      data: measurementsData.map(d => rangeData.max),
      label: 'max',
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
    })
  }

  const chartJsOptions = {
    type: 'line',
    data: {
      labels: measurementsData.map(d => moment(d.timestamp).format('DD/MM - hh:mm')),
      datasets: datasets,
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
  let width = measurementsData.length * 10
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

  Promise.all([
    measurementsApi.period(sensorId, fromEpoch, toEpoch),
    rangesApi.last(sensorId),
  ])
    .then(data => {
      const [ measurementsData, rangeData ] = data

      if (!measurementsData) {
        sendErrorMessage()
        return
      }

      return buildChart(measurementsData, rangeData)
    })
    .then(buffer => bot.sendPhoto(chatId, buffer))
    .catch(err => {
      console.error(err)
      sendErrorMessage()
    })
})
