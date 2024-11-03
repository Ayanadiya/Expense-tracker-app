const express= require('express');

const expenseController=require('../Controller/expense');

const router=express.Router();

router.get('/expenses', expenseController.getExpenses);

router.post('/expenses/add-expense', expenseController.postExpenses);

router.delete('/expenses/delete-expense/:expenseId', expenseController.deleteExpenses);

router.put('/expenses/edit-expense/:expenseId', expenseController.editExpenses);

module.exports=router;