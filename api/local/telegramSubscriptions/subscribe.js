var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName: 'telegram_subscriptions',
  Item: {
    sensorId: '1',
    chatId: '123',
  }
}

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('Added item:', JSON.stringify(data, null, 2))
  }
})
