const express = require('express');
const {db} = require('../config/firebaseConfig')
let routerUsers = express.Router();


let users = [
    {
        id: 1,
        data: {
        name: 'Olha Bilous',
        username: 'OlaBi',
        email: 'Olha@gmail.com'},
        address: {
            street: 'Panatella Drive',
            suite: 'Apt. 11',
            city: 'Calgary',
            zipcode: 'T3I 3W2',
        }
    }
]
//Get all users from firebase

routerUsers.get('/', async function(req, res) {
    try {
        const userRef = db.ref("users")
        userRef.once("value", (snapshot) => {
            if(snapshot.exists()){
                res.json(snapshot.val())
            }else{
                res.status(404).json({error: 'No user found'})
            }
        })
    } catch (error) {
     res.status(500).json({error})   
    }
    
})

//Create a new user

routerUsers.post('/', async (req, res) => {
    try {
        const { data, address} = req.body;
    if(!data || !address) {
        return res.status(400).json({Error: 'data and address are require'})
    }
    const newUserRef = db.ref("users").push();
    const newUser = {
        id: newUserRef.key,
        data,
        address
    };
    await newUserRef.set(newUser);
        res.status(201).json({ message: 'User has been created', user: newUser });

    } catch (error) {
        res.status(201).json({
           error: 'User has been created'
        })
    }
    
})

//update user by ID

routerUsers.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {data, address} = req.body;

        const userRef = db.ref(`users/${id}`);
        const snapshot = await userRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUser = { id, data, address };
        await userRef.update(updatedUser);
        res.json({ message: 'User has been updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

// Delete user by ID

routerUsers.delete('/id', async (req,res) => {
    try {
        const {id} = req.params;
        const userRef = db.ref(`users/${id}`);
        const snapshot = await userRef.once("value");
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userRef.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});
 
module.exports = routerUsers;