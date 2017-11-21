require('axios-debug-log')
const log = require('./src/components/logger')

// setup bot server
require('./src/bot_handlers')
log.info('bot server up')
