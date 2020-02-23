'use strict';

// const serverless = require('serverless-http');
const AWS = require('aws-sdk'); 
var response = require('cfn-response');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


  const tableName =  process.env.DYNAMODB_TABLE;
  console.log("tableName=",tableName)
  tableName=""
exports.handler = async function (event, context) {
  console.log("init function");

  const params = {
    TableName: tableName,
    Item:
    {
      "id": "dsds-dfdf",
      "name": "Brazil"
    }
  }
  var input = 5;

  var responseData = { Value: input * 5 };

  var mykey = await dynamoDb.put(params, (error, result) => {
    console.log("Error" + error);
    if (error) {
      console.log(error)
    }
    console.log('successfully adding record');
    responseData = 'successfully adding record';
  }).promise();
  console.log('finished');
  response.send(event, context, response.SUCCESS, responseData);
 
};


 
'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName =  process.env.DYNAMODB_TABLE;//'dynamodb-countries-serverless-v1-dev-countries';
console.log('tableName='+tableName)
exports.handler = (event, context) => {
console.log('event'+JSON.stringify(event));
var responseObject = {};
responseObject.event = event;
responseObject.context = context;
console.log('rep-objwect'+JSON.stringify(responseObject));
const params = {
                TableName: tableName,
                Item:
                {
                "id": "dsds-dfdf",
                "name": "Brazil"
                }
            }
          
dynamoDb.put(params, (error, result) => {
if (!error) {
console.log("INIT::a new record was added successfully!!");
sendResponse(responseObject,{Status:SUCCESS ,Data:result});
}
else{
  console.error("INIT:Error::"+error);
sendResponse(responseObject,{Status:FAILED ,Data:error});
}
});
            
            

}

function sendResponse(responseObject,responseType,responseData) {
  var cfnResponse = require('cfn-response');
  responseStatus=responseType==true ? cfnResponse.SUCCESS:cfnResponse.FAILED;
  cfnResponse.send(responseObject.event, responseObject.context, responseStatus,responseData);
}
//0Nica@1Aug19