const express = require ('express');
require('dotenv').config();
const connectWithDB = require('./config/connect');
const authRoute = require('./routes/authRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const postsRoute = require('./routes/postsRoute.js');
const commentsRoute = require ('./routes/commentsRoute.js')
const categorysRoute = require ('./routes/categorysRoute.js')
const {errorHandler,notFound, notFoundRoute} = require("./middlewares/error.js");

//init App :
const app = express();

//Meddelwares :
app.use(express.json());

//routes :
app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/posts',postsRoute);
app.use('/api/comments',commentsRoute);
app.use('/api/categories',categorysRoute);



//not found Route andler middlweare :
app.use(notFoundRoute)

//error handler middlweare :
app.use(errorHandler);

//Runnig Server :
app.listen(process.env.PORT,()=>console.log('Server Conneted ^_^ in '+process.env.NODE_ENV+' Mode .'));