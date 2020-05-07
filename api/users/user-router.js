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

module.exports = router;