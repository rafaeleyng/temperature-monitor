var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName: 'settings',
  Item: {
    key: 'bot_url',
    value: 'http://boturl.com',
  }
}

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('Added item:', JSON.stringify(data, null, 2))
  }
})
