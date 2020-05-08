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
	const { username, name } = body;

	const params = {
		TableName: 'Budgets',
		Key: {
			username,
			name,
		},
		UpdateExpression:
			'set loc = :loc, salary = :as, additional_income = :ai, gambling_winnings = :gw, housing.rent_or_mortgage = :hr, housing.utilities = :hu, food.groceries = :fg, food.restaurants = :fr, food.social = :fs, medical.insurance = :mi, medical.expenses = :me, transportation.car_payment = :tc, transportation.insurance = :ti, transportation.gas = :tg, transportation.misc = :tm, transportation.public_transit = :tp, transportation.ride_share = :tr, other_necessary.childcare = :oc, other_necessary.other_dependents = :oo, other_necessary.cellphone = :op, other_necessary.internet = :oi, other_necessary.debt_payments = :od, personal_expenses.fitness = :pf, personal_expenses.clothing = :pc, personal_expenses.electronics = :pe, personal_expenses.entertainment = :pn, personal_expenses.hygiene = :ph, personal_expenses.travel = :pt, personal_expenses.misc = :po, savings.retirement = :sr, savings.gen = :sg, savings.investments = :si, savings.misc = :sm',
		ExpressionAttributeValues: {
			':loc': body.loc,
			':as': body.salary,
			':ai': body.additional_income,
			':gw': body.gambling_winnings,
			':hr': body.housing.rent_or_mortgage,
			':hu': body.housing.utilities,
			':fg': body.food.groceries,
			':fr': body.food.restaurants,
			':fs': body.food.social,
			':mi': body.medical.insurance,
			':me': body.medical.expenses,
			':tc': body.transportation.car_payment,
			':ti': body.transportation.insurance,
			':tg': body.transportation.gas,
			':tm': body.transportation.misc,
			':tp': body.transportation.public_transit,
			':tr': body.transportation.ride_share,
			':oc': body.other_necessary.childcare,
			':oo': body.other_necessary.other_dependents,
			':op': body.other_necessary.cellphone,
			':oi': body.other_necessary.internet,
			':od': body.other_necessary.debt_payments,
			':pf': body.personal_expenses.fitness,
			':pc': body.personal_expenses.clothing,
			':pe': body.personal_expenses.electronics,
			':pn': body.personal_expenses.entertainment,
			':ph': body.personal_expenses.hygiene,
			':pt': body.personal_expenses.travel,
			':po': body.personal_expenses.misc,
			':sr': body.savings.retirement,
			':sg': body.savings.gen,
			':si': body.savings.investments,
			':sm': body.savings.misc,
		},
		ReturnValues: 'UPDATED_NEW',
	};

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
	const { username, name } = body;

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
			// console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
			res.status(200).json({ message: 'The budget has been deleted' });
		}
	});
});

module.exports = router;
