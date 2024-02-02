const express = require ('express');
const router = express.Router();
const {createCategoryCtrl} = require ("../controllers/categorysController");
const { verifyTokenAndAdminHeaders } = require('../middlewares/verifyToken');


router.route('/')
.post(verifyTokenAndAdminHeaders,createCategoryCtrl)



module.exports=router;