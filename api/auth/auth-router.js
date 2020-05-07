const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin, verifyPassword, createToken } = require("./auth-middleware");
const docClient = require("../utils");

const router = express.Router();

router.post("/register", validateRegister, (req, res) => {
  req.register.password = bcrypt.hashSync(req.register.password, 12);

  const params = {
    TableName: "Users",
    Item: {
      ...req.register
    },
    // Checks for nonexisting username before inserting
    Expected: {
      'username': {
        Exists: false
      }
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json({message: "Please provide a different username"});
    } else {
      res.status(201).json({token: createToken(req.register.username)});
    }
  });
});

router.post("/login", [validateLogin, verifyPassword], (req, res) => {
  res.status(201).json({token: createToken(req.login.username)});
});

module.exports = router;