'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string') {
    console.error('Validation Failed');
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the country.',
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: context.awsRequestId,
      name: data.name
    },
  };

  // write the countries to the database
  try {
  const data = await dynamoDb.put(params).promise();

    // handle  errors
 return {
  statusCode: 200,
  body: JSON.stringify(data.Item),
}
    
  
} catch (error) {
  return {
    statusCode: error.statusCode || 501,
    error: `Could not post: ${error.stack}`
  };
}
};
