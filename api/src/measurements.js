'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

var round = require('lodash.round')
var request = require('request')

// I feel REALLY sorry for this code, but I don't have time to refactor this
module.exports.submit = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const temperature = round(parseFloat(event.queryStringParameters.temperature), 1)
  const timestamp = (new Date).toISOString()

  const measurementItem = {
    'sensorId': sensorId,
    'temperature': temperature,
    'timestamp': timestamp,
  }

  const measurementParams = {
    TableName: 'measurements',
    Item: measurementItem,
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Measurement submited',
      data: measurementItem,
    }),
  }

  docClient.put(measurementParams, (err, measurementData) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
      callback(err);
    } else {
      console.log('Added item:', JSON.stringify(measurementData, null, 2))

      const rangeParams = {
        TableName : 'ranges',
        ProjectionExpression: '#timestamp, #min, #max',
        KeyConditionExpression: 'sensorId = :sensorId',
        ExpressionAttributeNames: {
          '#timestamp': 'timestamp',
        },
        ExpressionAttributeNames: {
          '#timestamp': 'timestamp',
          '#min': 'min',
          '#max': 'max',
        },
        ExpressionAttributeValues: {
          ':sensorId': sensorId,
        },
        ScanIndexForward: false,
        Limit: 1,
      }

      docClient.query(rangeParams, (err, rangeData) => {
        if (err) {
          console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
          callback(err);
        } else {
          const range = rangeData.Items[0]
          console.log('Query succeeded:', rangeData)

          const settingsParams = {
            TableName : 'settings',
            Key: {
              key: 'bot_url',
            },
          }

          docClient.get(settingsParams, function(err, settingsData) {
            if (err) {
              console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
              callback(err);
            } else {
              console.log('Query succeeded.')
              console.log('settingsData:', settingsData)
              const url = settingsData.Item ? settingsData.Item.value : undefined

              const subscriptionParams = {
                TableName : 'telegram_subscriptions',
                ProjectionExpression: 'sensorId, chatId',
                KeyConditionExpression: 'sensorId = :sensorId',
                ExpressionAttributeValues: {
                  ':sensorId': sensorId,
                },
                ScanIndexForward: false,
                Limit: 1,
              }

              docClient.query(subscriptionParams, function(err, subscriptionData) {
                if (err) {
                  console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
                  callback(err);
                } else {
                  console.log('Query succeeded.')
                  const subscription = subscriptionData.Items[0]

                  const isDataIncomplete = !range.timestamp || !url || !subscription
                  const isTemperatureOk = temperature > range.min && temperature < range.max

                  if (isDataIncomplete || isTemperatureOk) {
                    console.log('########### no notification configured', url, range, subscription)
                    callback(null, response)
                  } else {
                    const options = {
                      uri: url,
                      method: 'POST',
                      json: {
                        chatId: subscription.chatId,
                        sensorId: sensorId,
                        timestamp: timestamp,
                        temperature: temperature,
                        min: range.min,
                        max: range.max,
                      },
                    }
                    request(options, function (error, response, body) {
                      if (err) {
                        console.error('Error calling notifier. Error:', JSON.stringify(err, null, 2))
                        callback(err)
                      } else {
                        if (response.statusCode !== 200) {
                          console.error('Not 200 when calling notifier. Error:', JSON.stringify(err, null, 2))
                          callback(err)
                          return
                        }
                        callback(null, response)
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports.queryLast = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId

  var params = {
    TableName : 'measurements',
    ProjectionExpression: '#timestamp, temperature',
    KeyConditionExpression: 'sensorId = :sensorId',
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':sensorId': sensorId,
    },
    ScanIndexForward: false,
    Limit: 1,
  }

  docClient.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      callback(err);
    } else {
      console.log('Query succeeded:', data)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Last measurement for sensorId ${sensorId}`,
          data: data.Items[0],
        }),
      }

      callback(null, response)
    }
  })
}

module.exports.queryPeriod = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const fromEpoch = parseInt(event.queryStringParameters.from)
  const toEpoch = parseInt(event.queryStringParameters.to) || (new Date()).valueOf()

  const fromTimestamp = (new Date(fromEpoch)).toISOString()
  const toTimestamp = (new Date(toEpoch)).toISOString()

  var params = {
    TableName : 'measurements',
    ProjectionExpression: '#timestamp, temperature',
    KeyConditionExpression: 'sensorId = :sensorId AND #timestamp BETWEEN :fromTimestamp AND :toTimestamp',
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':sensorId': sensorId,
      ':fromTimestamp': fromTimestamp,
      ':toTimestamp': toTimestamp,
    },
  }

  docClient.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      callback(err);
    } else {
      console.log('Query succeeded:', data)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Last measurement for sensorId ${sensorId} for period ${fromTimestamp} - ${toTimestamp}`,
          data: data.Items,
        }),
      }

      callback(null, response)
    }
  })
}
