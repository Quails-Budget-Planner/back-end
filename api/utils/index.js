const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

AWS.config.update({
  region:  "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

function verifyToken(req,res,next) {
  const token = req.headers.authorization;  
  const secret = process.env.JWT_SECRET || "HELLOOOO";
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(400).json({error: "Invalid token"})
    } else {
      req.decoded = decodedToken;
      next();
    }
  })
}

module.exports = {
  docClient,
  verifyToken
}