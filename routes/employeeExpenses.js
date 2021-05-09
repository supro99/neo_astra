var express = require('express');
var router = express.Router();

var expenseServices = require('../services/expenseServices');
var verifyToken = require('../auth/verifyToken');

/* GET users listing. */
// Create user.
router.post('/signup', expenseServices.employeeSignup);

//User Login API
router.post('/login', expenseServices.employeeLogin);

//Create Expenses API
router.post('/', verifyToken, expenseServices.createExpense);

//Get Contacts API
router.get('/', verifyToken, expenseServices.getAllExpenses);

//Update Contacts API
router.patch('/', verifyToken, expenseServices.updateExpense);


//delete Contacts API
router.delete('/', verifyToken, expenseServices.deleteExpense);


module.exports = router;
