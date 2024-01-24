const express = require('express');
const { getAllUsersCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const router = express.Router();

    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)

module.exports=router;