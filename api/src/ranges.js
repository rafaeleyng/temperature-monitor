'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

var round = require('lodash.round')

module.exports.submit = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const sensorId = event.pathParameters.sensorId
  const timestamp = (new Date).toISOString()

  const min = round(parseFloat(data.min), 1)
  const max = round(parseFloat(data.max), 1)

  const item = {
    'sensorId': sensorId,
    'timestamp': timestamp,
    'min': min,
    'max': max,
  }

  var params = {
    TableName: 'ranges',
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
          message: 'Range submited',
          data: item,
        }),
      }

      callback(null, response)
    }
  })
}

module.exports.queryLast = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId

  var params = {
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

  docClient.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      callback(err);
    } else {
      console.log('Query succeeded:', data)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Last range for sensorId ${sensorId}`,
          data: data.Items[0],
        }),
      }

      callback(null, response)
    }
  })
}
