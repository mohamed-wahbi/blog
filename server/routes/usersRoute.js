const express = require('express');
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const router = express.Router();


    // api/users/profile
    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)
    // api/users/profile/:id
    router.route('/profile/:id').get(getUserProfileCtrl);

module.exports=router;