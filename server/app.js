const express = require ('express');
require('dotenv').config();
const connectWithDB = require('./config/connect');
const authRoute = require('./routes/authRoute.js');
const usersRoute = require('./routes/usersRoute.js');


//init App :
const app = express();

//Meddelwares :
app.use(express.json());

//routes :
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);


//Runnig Server :
app.listen(process.env.PORT,()=>console.log('Server Conneted ^_^ in '+process.env.NODE_ENV+' Mode .'));