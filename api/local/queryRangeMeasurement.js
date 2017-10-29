var AWS = require('aws-sdk')
var parseDuration = require('parse-duration')

AWS.config.loadFromPath('./config.json')

var docClient = new AWS.DynamoDB.DocumentClient()

const intervalStr = '160m'
const intervalMs = parseDuration(intervalStr)

const now = new Date()
const limitDate = new Date(now.valueOf() - intervalMs)

const fromTimestamp = limitDate.toISOString()
const toTimestamp = now.toISOString()

console.log('# fromTimestamp', fromTimestamp)
console.log('# toTimestamp', toTimestamp)

var params = {
  TableName : 'measurements',
  ProjectionExpression: '#timestamp, temperature',
  KeyConditionExpression: 'sensorId = :sensorId AND #timestamp BETWEEN :fromTimestamp AND :toTimestamp',
  ExpressionAttributeNames: {
    '#timestamp': 'timestamp',
  },
  ExpressionAttributeValues: {
    ':sensorId': '1',
    ':fromTimestamp': fromTimestamp,
    ':toTimestamp': toTimestamp,
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
