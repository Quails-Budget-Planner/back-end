const { docClient } = require("../utils");
const AWS = require("aws-sdk");

const queryAllBudgets = username => {
  const params = {
    TableName: "Budgets",
    KeyConditionExpression: "#username = :user",
    ExpressionAttributeNames:{
      "#username": "username"
    },
    ExpressionAttributeValues: {
      ":user": username
    }
  }
  return docClient.query(params).promise();
}

const deleteAllBudgets = budgets => {
  const requests = budgets.Items.map(createDelRequests);
  const params = {
    RequestItems: {
      'Budgets': requests
    }
  };
 return docClient.batchWrite(params).promise();
}

const deleteUser = username => {
  const params = {
    TableName: 'Users',
    Key: {
      username: username,
    },
    ConditionExpression: 'attribute_exists(username)'
  };

  return docClient.delete(params).promise();
}

const createDelRequests = (request) => {
  return {
    DeleteRequest: {
      Key: {
        username: request.username,
        name: request.name
      }
    }
  }
}
module.exports = {
  queryAllBudgets,
  deleteAllBudgets,
  deleteUser
}