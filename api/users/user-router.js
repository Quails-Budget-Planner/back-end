const express = require("express");
const { docClient } = require("../utils");
const ddbModel = require('./user-model');
const { verifyToken } = require("../utils");

const router = express.Router();

router.use(verifyToken);

router.get("/", (req,res) => {
  const params = {
    TableName: 'Users',
    Key: {
      username: req.decoded.username,
    }
  };

  docClient.get(params, (err,data) => {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        res.status(500).json({message: "Error retrieving data."});
    } else {
        res.status(200).json({name: data.Item.name, username: data.Item.username})
    }
  });
});

router.put("/", async (req, res) => {
  // can only edit display name right now
  // do i want to verify old password before changing?
  // changing username = changing hashkey on budget
  const params = {
    TableName: 'Users',
    Key: { username: req.decoded.username },
    UpdateExpression: 'set #n = :n',
    ConditionExpression: 'attribute_exists(username)',
    ExpressionAttributeNames: {'#n': 'name'},
    ExpressionAttributeValues: {':n': req.body.name}
  }

  docClient.update(params).promise()
    .then(data => res.json({message: "Update successful!"}))  
    .catch(data => res.json(data))

});

router.delete("/", async (req, res) => {
  ddbModel.queryAllBudgets(req.decoded.username)
    .then(ddbModel.deleteAllBudgets)
    .then(_ => ddbModel.deleteUser(req.decoded.username))
    .then(_ => res.status(201).json({message: "Successful deletion!"}))
    .catch(err => res.status(500).json({message: "Unsuccessful deletion."}));
});

module.exports = router;