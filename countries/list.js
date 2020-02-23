'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list =async  (event, context, callback) => {
  try{
  // fetch all country from the database
  const data=await  dynamoDb.scan(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
    
  }
  catch(error){
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the country.',
    };
  }
    
};
