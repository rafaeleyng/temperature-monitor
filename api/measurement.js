'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

var round = require('lodash.round')

module.exports.submit = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const temperature = round(parseFloat(event.queryStringParameters.temperature), 1)
  const timestamp = (new Date).toISOString()

  const item = {
    'sensorId': sensorId,
    'temperature': temperature,
    'timestamp': timestamp,
  }

  var params = {
    TableName: 'measurements',
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
          message: 'Measurement submited',
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

module.exports.queryRange = (event, context, callback) => {
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
          message: `Last measurement for sensorId ${sensorId} for range ${fromTimestamp} - ${toTimestamp}`,
          data: data.Items,
        }),
      }

      callback(null, response)
    }
  })
}
