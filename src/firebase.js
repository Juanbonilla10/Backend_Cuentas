require('dotenv').config();

const { initializeApp, applicationDefault } = require('firebase-admin/app')
const  admin  = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require("../firebase.json");

console.log(process.env.API_KEY)

initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

const db = getFirestore()

module.exports = {
    db
}