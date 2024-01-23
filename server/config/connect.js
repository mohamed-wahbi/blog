const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
.then(()=>console.log('Connected With DB ^_^'))
.catch((error)=>console.log('Connection Failed To MongoDB'))

module.exports = mongoose;