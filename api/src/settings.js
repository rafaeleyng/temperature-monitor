'use strict'

var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

module.exports.submit = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const { key, value } = data

  const item = {
    key,
    value,
  }

  var params = {
    TableName: 'settings',
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
          message: 'Setting submited',
          data: item,
        }),
      }

      callback(null, response)
    }
  })
}
