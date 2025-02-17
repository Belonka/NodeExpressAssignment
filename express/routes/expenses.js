const express = require('express');
const {db} = require('../config/firebaseConfig')
const routerExpenses = express.Router();

let expenses = [
    {
        id:1,
        Savings:{
            RRSP:'1000$',
            'Investment Savings': 4000,
            'Long-term savings': '5000',
            Bonds:200,
            others:500
        },
        // 'Payment obligations':{
        //     'credit card': 500,
        //     Loan: 6000,
        //     'Vehicle lease': 200,
        //     'Line of credit': 1000
        // },
        Insurance:{
            'life insurance': 400,
            'health insurance': 600,
            others: 300
        },
        Housing:{
            Rent: 600,
            'rent insurance': 400,
            'storage and parking': 500,
            utilities: 200,
            maintenance: 100
        }
        // Utilities:{
        //     phone: 600,
        //     internet:300,
        //     water: 400,
        //     heat: 100,
        //     electricity: 400,
        //     cable: 200,
        //     others: 150
        // },
        // Personal:{
        //     transportation: 50,
        //     clothing: 60,
        //     'gifts family': 40,
        //     'personal grooming': 100,
        //     'dining out': 300,
        //     hobbies: 200,
        //     others:60
        // }
    }
]

// Get all expenses from Firebase

routerExpenses.get('/', async (req, res) => {
    try {
        const expensesRef = db.ref("expenses")
        expensesRef.once("value", (snapshot) => {
            if(snapshot.exists()){
                res.json(snapshot.val())
            }else{
                res.status(404).json({error: 'No expenses found'})
            }
        })
    } catch (error) {
     res.status(500).json({error})   
    }
    
})

// Create a new expense

routerExpenses.post('/', async (req, res) => {
    try {
        const {Savings, Insurance, Housing} = req.body;
        if(!Savings || !Insurance || !Housing){
            return res.status(404).json({errorMessage: 'All form required to field' })
        }
        const newExpenseRef = db.ref("expenses").push();
        const newExpense = {
            id: newExpenseRef.key,
            Savings,
            Insurance,
            Housing
        };
        await newExpenseRef.set(newExpense);
        res.status(201).json({ message: 'Expense has been created', expense: newExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Update expense by ID

routerExpenses.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
    const {Savings, Insurance, Housing} =  req.body;

    const expenseRef = db.ref(`expenses/${id}`);
        const snapshot = await expenseRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ errorMessage: 'Expense not found' });
        }

        const updatedExpense = { id, Savings, Insurance, Housing };
        await expenseRef.update(updatedExpense);
        res.json({ message: 'Expense has been updated', expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

// Delete expense by ID

routerExpenses.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const expenseRef = db.ref(`expenses/${id}`);
        const snapshot = await expenseRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ errorMessage: 'Expense not found' });
        }

        await expenseRef.remove();
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = routerExpenses;