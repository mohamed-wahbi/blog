const express = require('express');
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const validateObjectId= require ('../middlewares/validateObjectId.js');
const router = express.Router();


    // api/users/profile
    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)
    // api/users/profile/:id
    router.route('/profile/:id').get(validateObjectId,getUserProfileCtrl);

module.exports=router;