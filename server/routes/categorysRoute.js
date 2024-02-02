const express = require ('express');
const router = express.Router();
const {createCategoryCtrl,getAllCategoryCtrl, deleteCategoryCtrl} = require ("../controllers/categorysController");
const { verifyTokenAndAdminHeaders } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId.js');

// api/categories/
router.route('/')
.post(verifyTokenAndAdminHeaders,createCategoryCtrl)
.get(getAllCategoryCtrl)

// api/categories/:id
router.route('/:id')
.delete(validateObjectId,verifyTokenAndAdminHeaders,deleteCategoryCtrl)



module.exports=router;