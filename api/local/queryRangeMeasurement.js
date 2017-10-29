var AWS = require('aws-sdk')

AWS.config.loadFromPath('./config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName : 'measurements',
  KeyConditionExpression: 'sensorId = :sensorId AND #timestamp BETWEEN :fromTimestamp AND :toTimestamp',
  ExpressionAttributeNames: {
    '#timestamp': 'timestamp',
  },
  ExpressionAttributeValues: {
    ':sensorId': '1',
    ':fromTimestamp': '2017-10-29T02:11:25.523Z',
    ':toTimestamp': '2017-10-29T19:47:14.237Z',
  },
}

docClient.query(params, function(err, data) {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
  } else {
    console.log('Query succeeded.')
    data.Items.forEach((item, i) => console.log(i, item))
  }
})
