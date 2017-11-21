require('axios-debug-log')
const log = require('./src/components/logger')

// setup express server to handle notifications
const notificationHandler = require('./src/api_handlers/notification')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.post('/', notificationHandler)
app.listen(3000, () => log.info('Notifications server listening on port 3000!'))

// register service url
const { NOW_URL } = process.env
const settingsApi = require('./src/components/settingsApi')
settingsApi.submit('bot_url', NOW_URL)
  .then(() => log.info('settings submited'))
  .catch((err) => {
    log.error('[unable to submit settings]')
    log.error(err)
    throw err
  })
