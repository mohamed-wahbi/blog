const express = require ('express');
require('dotenv').config();
const connectWithDB = require('./config/connect');



//init App :
const app = express();

//Meddelwares :
app.use(express.json());

//Runnig Server :
app.listen(process.env.PORT,()=>console.log('Server Conneted ^_^ in '+process.env.NODE_ENV+' Mode .'));