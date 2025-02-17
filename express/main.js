const express = require('express');
const routerUsers = require('./routes/users.js');
const routerIncomes = require('./routes/income.js');
const routerExpenses = require('./routes/expenses.js');
//const firebaseConfig = require('./config/firebase-config.js')


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/users', routerUsers)
app.use('/incomes', routerIncomes)
app.use('/expenses', routerExpenses)



const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})



