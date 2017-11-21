var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName : 'telegram_subscriptions',
  Key: {
    chatId: '123',
    sensorId: '1',
  },
}

docClient.delete(params, function(err, data) {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
  } else {
    console.log('Query succeeded.')
    console.log('data:', data)
  }
})
