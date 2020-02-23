'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete =async  (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
try{
  // delete the country from the database
 const data= await dynamoDb.delete(params).promise();
   return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  }
  catch (error) {
    return {
      statusCode: error.statusCode || 501,
      error: `Could not post: ${error.stack}`
    };
  }
};


