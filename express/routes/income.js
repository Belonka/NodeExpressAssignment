const express = require('express');
const {db} = require('../config/firebaseConfig')
const routerIncomes = express.Router();

let incomes = [
    {
        id: 1,
        typesIncome: {
            wages: 1400,
            'secondary income': 700,
            interest: 120,
            'support payment': 4,
            others: 100
        }
    }
]

//Get all incomes from firebase

routerIncomes.get('/', async function(req, res) {
    try {
        const incomeRef = db.ref("incomes")
        incomeRef.once("value", (snapshot) => {
            if(snapshot.exists()){
                res.json(snapshot.val())
            }else{
                res.status(404).json({error: 'No income found'})
            }
        })
    } catch (error) {
     res.status(500).json({error})   
    }
    
})

// Create a new income

routerIncomes.post('/', async (req, res) => {
    try {
        const { typesIncome} = req.body;

    if(!typesIncome) {
        return res.status(400).json({Error: 'typesIncome is require'})
    }
    const newIncomeRef = db.ref("incomes").push();
        const newIncome = {
            id: newIncomeRef.key,
            typesIncome
        };

        await newIncomeRef.set(newIncome);
        res.status(201).json({ message: 'Income has been created', income: newIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

// Update income by ID

routerIncomes.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
    const {typesIncome} = req.body;

    const incomeRef = db.ref(`incomes/${id}`);
        const snapshot = await incomeRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Income not found' });
        }

        const updatedIncome = { id, typesIncome };
        await incomeRef.update(updatedIncome);
        res.json({ message: 'Income has been updated', income: updatedIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

//Delete income by ID

routerIncomes.delete('/id', async (req, res) => {
    try {
        const { id } = req.params;
        const incomeRef = db.ref(`incomes/${id}`);
        const snapshot = await incomeRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Income not found' });
        }

        await incomeRef.remove();
        res.json({ message: 'Income deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})
module.exports = routerIncomes;