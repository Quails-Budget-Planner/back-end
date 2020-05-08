const express = require("express");
const { docClient } = require("../utils");

const router = express.Router();

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

router.delete("/", async (req, res) => {
  const userParams = {
    TableName: 'Users',
    Key: {
      username: req.decoded.username,
    },
    ConditionExpression: 'attribute_exists(username)'
  };

  // NEED BOTH NAME AND USERNAME
  const budgetParams = {
    RequestItems: {
     "Budgets": [
       {
         DeleteRequest: {
           Key: { 'name': '*' , 'username': 'jordandoan4'}
         }
       }
     ]
    }} 
    docClient.delete(userParams , (err,data) => {
      if (err) {
        console.log(err);
        res.json(err)
      }
    });

    // docClient.delete(userParams, (err, data) => {
    //   if (err) {
    //     console.log(1);
    //     console.log(err);
    //     res.json({message: "Unsuccessful deletion."});
    //   } else {
    //     docClient.batchWrite(budgetParams, (err, data) => {
    //       if (err) {
    //         console.log(2);
    //         console.log(err);
    //         res.json({message: "Unsuccessful deletion."});
    //       } else {
    //         res.send('hi');
    //       }
    //     })
    //   }
    // })
    // docClient.batchWrite(budgetParams, (err, data) => {
    //   if (err) {
    //     console.log(2);
    //     console.log(err);
    //     res.json({message: "Unsuccessful deletion."});
    //   } else {
    //     res.send('hi');
    //   }
    // })
});
module.exports = router;