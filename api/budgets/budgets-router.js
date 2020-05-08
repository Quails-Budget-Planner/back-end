const express = require('express');

const { docClient } = require('../utils');

const router = express.Router();

// POST /api/budgets endpoint - Functional!
router.post('/', ({ body }, res) => {
	const params = {
		TableName: 'Budgets',
		Item: {
			...body,
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

// PUT /api/budgets endpoint
router.put('/', ({ body }, res) => {
	docClient.update(params, function (err, data) {
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

// DELETE /api/budgets endpoint - Functional!
router.delete('/', ({ body }, res) => {
	const params = {
		TableName: 'Budgets',
		Key: {
			...body,
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
			// console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
			res.status(200).json({ message: 'The budget has been deleted' });
		}
	});
});

module.exports = router;
