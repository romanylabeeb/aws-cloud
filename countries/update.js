'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name!== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the country item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#country_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name
    },
    UpdateExpression: 'SET #country_name = :name',
    ReturnValues: 'ALL_NEW',
  };

  // update the country in the database
  // dynamoDb.update(params, (error, result) => {
  //   // handle  errors
  //   if (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: { 'Content-Type': 'text/plain' },
  //       body: 'Couldn\'t fetch the country item.',
  //     });
  //     return;
  //   }

  //   // create a response
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(result.Attributes),
  //   };
  //   callback(null, response);
  // });
};
