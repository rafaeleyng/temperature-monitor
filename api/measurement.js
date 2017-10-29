'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

module.exports.submit = (event, context, callback) => {
  const sensorId = event.pathParameters.sensorId
  const temperature = parseFloat(event.queryStringParameters.temperature)
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
          message: 'Measurement submited!',
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
    KeyConditionExpression: 'sensorId = :sensorId',
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
          message: 'Query succeeded!',
          data: data.Items[0],
        }),
      }

      callback(null, response)
    }
  })
}
