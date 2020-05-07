const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegister } = require("./auth-middleware");
const docClient = require("../utils");

const router = express.Router();

router.post("/register", validateRegister, (req, res) => {
  req.register.password = bcrypt.hashSync(req.register.password, 12);
  const params = {
    TableName: "Users",
    Item: {
      ...req.register
    },
    Expected: {
      'username': {
        Exists: false
      }
    }
  };
  docClient.put(params, function(err, data) {
    console.log(err, data);
    if (err) {
      console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      res.status(201).json({message: "Successful signup!", success: true});
    }
  });
});

module.exports = router;