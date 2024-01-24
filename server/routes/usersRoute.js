const express = require('express');
const { getAllUsersCtrl } = require('../controllers/usersController');
const router = express.Router();

    router.get('/profile',getAllUsersCtrl)

module.exports=router;