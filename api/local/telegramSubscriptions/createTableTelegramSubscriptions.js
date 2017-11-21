var AWS = require('aws-sdk')

AWS.config.loadFromPath('../config.json')

var dynamodb = new AWS.DynamoDB()

var params = {
    TableName : 'telegram_subscriptions',
    KeySchema: [
        { AttributeName: 'sensorId', KeyType: 'HASH'},
        { AttributeName: 'chatId', KeyType: 'RANGE'},
    ],
    AttributeDefinitions: [
        { AttributeName: 'sensorId', AttributeType: 'S' },
        { AttributeName: 'chatId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
})
