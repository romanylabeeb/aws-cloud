'use strict';
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "id": event.pathParameters.id
    }
  };
  console.log("params "+JSON.stringify(params));

  try{
  const result = await dynamoDb.get(params).promise();
  if (result.Item) {
    return {
      statusCode:200,
      body: JSON.stringify(result.Item)
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Couldn't find the todo item." })
    };
  }
}
catch(error){
  console.error(error)
}
}

