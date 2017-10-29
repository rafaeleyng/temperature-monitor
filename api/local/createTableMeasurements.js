var AWS = require('aws-sdk')

AWS.config.loadFromPath('./config.json')

var dynamodb = new AWS.DynamoDB()

var params = {
    TableName : 'measurements',
    KeySchema: [
        { AttributeName: 'sensorId', KeyType: 'HASH'},  //Partition key
        { AttributeName: 'timestamp', KeyType: 'RANGE' }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'sensorId', AttributeType: 'S' },
        { AttributeName: 'timestamp', AttributeType: 'S' }
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
