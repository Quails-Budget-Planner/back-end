const AWS = require("aws-sdk");
const express = require("express");
const server = express();

AWS.config.update({
  region:  "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Users";

const params = {
    TableName: table,
    Key: {
      username: "jordan",
    }
};

server.get("/", (req,res) => {
    docClient.get(params, (err,data) => {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          console.log(data);
          res.json(data);
      }
  });
});

server.get("/all", (req,res) => {
  const params = {
    TableName: "Budgets",
    KeyConditionExpression: "#nn = :uu",
    ExpressionAttributeNames:{
      "#nn": "username"
    },
    ExpressionAttributeValues: {
      ":uu": "jordan"
    }
  }
  docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      res.json(data);
    }
  });
});

server.get("/one", (req,res) => {
  const params = {
    TableName: "Budgets",
    Key: {
      username: "jordan",
      name: "california"
    }
};
  docClient.get(params, (err,data) => {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        console.log(data);
        res.json(data);
    }
  });
});

module.exports = server;