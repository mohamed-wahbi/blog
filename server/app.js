const express = require ('express');
require('dotenv').config();
const connectWithDB = require('./config/connect');
const authRoute = require('./routes/authRoute.js')


//init App :
const app = express();

//Meddelwares :
app.use(express.json());

//routes :
app.use('/api/auth',authRoute);


//Runnig Server :
app.listen(process.env.PORT,()=>console.log('Server Conneted ^_^ in '+process.env.NODE_ENV+' Mode .'));