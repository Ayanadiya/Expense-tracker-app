const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenseapp', 'root', 'Ayana@17', {
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;