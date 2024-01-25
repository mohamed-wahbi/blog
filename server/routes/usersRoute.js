const express = require('express');
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken');
const validateObjectId= require ('../middlewares/validateObjectId.js');
const router = express.Router();


    // api/users/profile
    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)
    // api/users/profile/:id
    router.route('/profile/:id')
    .get(validateObjectId,getUserProfileCtrl)
    .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)

module.exports=router;