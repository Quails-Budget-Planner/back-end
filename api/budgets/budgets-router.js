const express = require('express');

const docClient = require('../utils');

const router = express.Router();

// POST /api/budgets endpoint
router.post('/', (req, res) => {
	const params = {
		TableName: 'Users',
		Item: {
			username: 'jonathan',
			budget_name: 'test budget name',
			location: 'test location',
			annual_salary: 50000,
			additional_income: 10000,
			gambling_winnings: 5000,
			housing: {
				rent_or_mortgage: 900,
				utilities: 100,
			},
			food: {
				groceries: 200,
				restaurants: 200,
				social: 100,
			},
			medical: {
				insurance: 100,
				expenses: 50,
			},
			transportation: {
				car_payment: 200,
				insurance: 50,
				gas: 150,
				misc: 50,
				public_transit: 0,
				ride_share: 0,
			},
			other_necessary: {
				childcare: 0,
				other_dependents: 0,
				cellphone: 15,
				internet: 50,
				debt_payments: 0,
			},
			personal_expenses: {
				fitness: 50,
				clothing: 50,
				electronics: 50,
				entertainment: 50,
				hygiene: 20,
				travel: 0,
				other: 0,
			},
			savings: {
				retirement: 0,
				general: 0,
				investments: 0,
				other: 0,
			},
		},
		Expected: {
			budget_name: {
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
		} else {
			console.log('Added item:', JSON.stringify(data, null, 2));
			res.json(data);
		}
	});
});

// PUT /api/budgets endpoint
router.put('/:id', (req, res) => {
	docClient.update(params, function (err, data) {
		if (err) {
			console.error(
				'Unable to update item. Error JSON:',
				JSON.stringify(err, null, 2),
			);
		} else {
			console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
		}
	});
});

// DELETE /api/budgets endpoint
router.delete('/:id', (req, res) => {});

module.exports = router;
