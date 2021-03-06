var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName : 'ranges',
  ProjectionExpression: '#timestamp, #min, #max',
  KeyConditionExpression: 'sensorId = :sensorId',
  ExpressionAttributeNames: {
    '#timestamp': 'timestamp',
    '#min': 'min',
    '#max': 'max',
  },
  ExpressionAttributeValues: {
    ':sensorId': '1'
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
