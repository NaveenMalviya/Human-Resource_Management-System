// const express = require('express');
// const expensesController = require('../controller/expensesController');
// const router = express.Router();

// // Routes for expenses
// router.post('/create', expensesController.createExpense);
// router.get('/list', expensesController.getAllExpenses);
// router.get('/:id', expensesController.getExpenseById);
// router.put('/:id', expensesController.updateExpense);
// router.delete('/:id', expensesController.deleteExpense);
// router.post('/multiDelete', expensesController.multiDeleteExpenses);
// router.get('/', expensesController.searchExpenses);

// module.exports = router;





const express = require('express');
const expensesController = require('../controller/expensesController');
const router = express.Router();

// Route to create a new expense
router.post('/create', expensesController.createExpense);

// Route to get all expenses
router.get('/list', expensesController.getExpenses);

// Route to get a single expense by ID
router.get('/getById', expensesController.getExpenseById);

// Route to update an expense
router.put('/update', expensesController.updateExpense);

// Route to delete an expense by ID
router.delete('/delete', expensesController.deleteExpense);

// Route to search for expenses
router.get('/search', expensesController.searchExpenses);


router.get('/count', expensesController.countExpenses);

// Route to delete multiple expenses
router.delete('/multiDelete', expensesController.multiDeleteExpenses);

module.exports = router;
