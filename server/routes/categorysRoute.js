const express = require ('express');
const router = express.Router();
const {createCategoryCtrl,getAllCategoryCtrl} = require ("../controllers/categorysController");
const { verifyTokenAndAdminHeaders } = require('../middlewares/verifyToken');


router.route('/')
.post(verifyTokenAndAdminHeaders,createCategoryCtrl)
.get(getAllCategoryCtrl)


module.exports=router;