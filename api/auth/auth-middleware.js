const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { docClient } = require("../utils");

module.exports = {
  validateRegister: (req, res, next) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      res.status(400).json({message: "Invalid body."})
    } else {
      req.register = { username, password, name }
      next();
    }
  },

  validateLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({message: "Invalid body."});
    } else {
      req.login = { username, password };
      next();
    }
  },

  verifyPassword: (req, res, next) => {
    const params = {
      TableName: "Users",
      Key: {
        username: req.login.username
      }
    };

    docClient.get(params, (err,data) => {
      if (err) {
        res.status(404).json({message: "Incorrect Credentials"});
      } else {
        if (bcrypt.compareSync(req.login.password, data.Item.password)) {
          next();
        } else {
          res.status(404).json({message: "Incorrect Credentials"});
        }
      }
    });
  },
  
  createToken: (username) => {
    const payload = {
      username
    };
    const secret = process.env.JWT_SECRET || "HELLOOOO";
    return jwt.sign(payload, secret); // this method is synchronous
  }
}