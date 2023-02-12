require('dotenv').config();
const mongoose = require('mongoose');

 
module.exports = ()=>{
    const db = mongoose.connect(process.env.MONGO_CONNECTION_URL);
    
    db.then((x) => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
      console.error('Error connecting to mongo', err.reason)
    });
    }