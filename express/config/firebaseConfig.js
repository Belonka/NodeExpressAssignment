

const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();
const credentials = require('./firebase.json')


admin.initializeApp({
    credential:admin.credential.cert(credentials),
    databaseURL: process.env.FIREBASE_DATABASE_URL
    
})
 
const db = admin.database();
const auth = admin.auth(); 

module.exports = {db, admin};
