const express = require('express');

const { docClient } = require('../utils');
const { verifyToken } = require("../utils");

const router = express.Router();

router.use(verifyToken);
// POST /api/budget endpoint - Functional!
router.post('/', ({ body, decoded }, res) => {
	const params = {
		TableName: 'Budgets',
		Item: {
			...body,
			username: decoded.username,
		},
		Expected: {
			name: {
				Exists: false,
			},
		},
	};

	docClient.put(params, function (err, data) {
		if (err) {
			console.error(
				'Unable to add item. Error JSON:',
				JSON.stringify(err, null, 2),
			);
			res.status(500).json({ message: 'Error adding new budget' });
		} else {
			// console.log('Added item:', JSON.stringify(data, null, 2));
			// res.status(201).json(data);
			res.status(201).json({ message: 'New budget successfully added' });
		}
	});
});

// PUT /api/budget endpoint - Functional!
router.put('/', ({ body, decoded }, res) => {
	const params = {
		RequestItems: {
			Budgets: [
				{
					PutRequest: {
						Item: {
							...body,
							username: decoded.username,
						},
					},
				},
			],
		},
	};

	docClient.batchWrite(params, function (err, data) {
		if (err) {
			console.error(
				'Unable to update item. Error JSON:',
				JSON.stringify(err, null, 2),
			);
			res.status(500).json({ message: 'Failed to update budget' });
		} else {
			// console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
			// res.status(200).json(data);
			res.status(200).json({ message: 'Budget successfully updated' });
		}
	});
});

// DELETE /api/budget endpoint - Functional!
router.delete('/', ({ body, decoded }, res) => {
	const { username } = decoded;
	const { name } = body;

	const params = {
		TableName: 'Budgets',
		Key: {
			username,
			name,
		},
	};

	docClient.delete(params, function (err, data) {
		if (err) {
			console.error(
				'Unable to delete item. Error JSON:',
				JSON.stringify(err, null, 2),
			);
			res.status(500).json({ message: 'Error deleting the budget' });
		} else {
			console.log(data);
			// console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
			res.status(200).json({ message: 'The budget has been deleted' });
		}
	});
});

module.exports = router;
