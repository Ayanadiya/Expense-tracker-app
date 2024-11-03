const Expense= require('../models/expense');

exports.getExpenses=((req, res, next) => {
    Expense.findAll()
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err));
}) 

exports.postExpenses=((req, res, next) =>{
    const expense=req.body.expenseEvent;
    const amount=req.body.amount;
    const category=req.body.type;
    Expense.create({
        expense:expense,
        amount:amount,
        category:category
    })
    .then(result => {
        console.log('expense added');
        return res.json(result);
    })
    .catch(err => console.log(err))
})

exports.deleteExpenses= ((req,res,next) => {
    const id=req.params.expenseId;
    Expense.findByPk(id)
    .then(expense =>{
         if(!expense)
         {
            return res.status(404).json({ message: 'Expense not found' });
         }
         else
         {
            return expense.destroy();
         }
    })
    .then(() => {
        console.log('expense deleted');
        res.status(204).send();
    })
    .catch(err => console.log(err));
})

exports.editExpenses= ((req,res,next) => {
    const id=req.params.expenseId;
    const updatedexpense=req.body.expenseEvent;
    const updatedamount=req.body.amount;
    const updatedcategory=req.body.type;
    Expense.findByPk(id).then(expense => {
        expense.expense=updatedexpense;
        expense.amount=updatedamount;
        expense.category=updatedcategory;
        return expense.save();
    })
    .then(result => {
        console.log('expense updated');
        return res.json(result);
    })
    .catch(err => console.log(err))
})