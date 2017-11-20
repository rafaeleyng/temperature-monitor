var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName : 'settings',
  ProjectionExpression: '#value',
  KeyConditionExpression: '#key = :key',
  ExpressionAttributeNames: {
    '#key': 'key',
    '#value': 'value',
  },
  ExpressionAttributeValues: {
    ':key': 'bot_url'
  },
  ScanIndexForward: false,
  Limit: 1,
}

docClient.query(params, function(err, data) {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
  } else {
    console.log('Query succeeded.')
    data.Items.forEach((item, i) => console.log(i, item))
  }
})
