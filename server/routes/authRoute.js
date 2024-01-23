const express = require('express');
const router = express.Router();

const {registerUserCtrl} = require('../controllers/authController.js');


// api/auth/register
router.post ('/register',registerUserCtrl);

module.exports=router