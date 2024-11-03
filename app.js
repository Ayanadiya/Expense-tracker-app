const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');

const app= express();

const expenseRoutes= require('./routes/expense');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

//app.get('/expenses', (req, res) => {
 //   res.sendFile(path.join(__dirname, 'views', 'index.html'));
//});

app.use(expenseRoutes);

sequelize.sync()
.then(result =>{
    console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));

