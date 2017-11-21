const log = require('./src/components/logger')
require('axios-debug-log')

// setup bot server
require('./src/bot_handlers')
log.info('bot server up')

// setup express server to handle notifications
// const notificationHandler = require('./src/api_handlers/notification')
// const express = require('express')
// const app = express()
// app.get('/', notificationHandler)
// app.listen(3000, () => log.info('Notifications server listening on port 3000!'))

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
