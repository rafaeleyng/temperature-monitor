'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

module.exports.subscribe = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const chatId = event.pathParameters.chatId

  const item = {
    sensorId,
    chatId,
  }

  const params = {
    TableName: 'telegram_subscriptions',
    Item: item,
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
      callback(err);
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2))

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Telegram subscription submited',
          data: item,
        }),
      }

      callback(null, response)
    }
  })
}

module.exports.unsubscribe = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const chatId = event.pathParameters.chatId

  const key = {
    sensorId,
    chatId,
  }

  const params = {
    TableName: 'telegram_subscriptions',
    Key: key,
  }

  docClient.delete(params, function(err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      callback(err)
    } else {
      console.log('Query succeeded.')

      console.log('data:', data)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Telegram subscription submited',
          data: key,
        }),
      }

      callback(null, response)
    }
  })
}
