const AWS = require('aws-sdk');
const express = require('express');

const server = express();

AWS.config.update({
	region: 'us-east-2',
	endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Users';

const params = {
	TableName: table,
	Key: {
		username: 'jordandoan',
	},
};

server.get('/', (_req, res) => {
	docClient.get(params, (err, data) => {
		if (err) {
			console.error(
				'Unable to read item. Error JSON:',
				JSON.stringify(err, null, 2),
			);
		} else {
			// console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
			// console.log(data);
			res.json(data);
		}
	});
});

module.exports = server;
