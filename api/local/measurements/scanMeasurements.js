var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName: 'measurements',
  ProjectionExpression: 'sensorId, #timestamp, temperature',
  ExpressionAttributeNames: {
    '#timestamp': 'timestamp',
  },
}

docClient.scan(params, (err, data) => {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
  } else {
    console.log('Query succeeded.')
    data.Items.forEach((item, i) => console.log(i, item))
  }
})
