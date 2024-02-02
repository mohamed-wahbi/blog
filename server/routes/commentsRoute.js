const express = require('express');
const { verifyToken, verifyTokenAndAdminHeaders } = require('../middlewares/verifyToken');
const { createCommentCtrl, getCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require('../controllers/commentsController');
const router = express.Router();
const validateObjectId = require('../middlewares/validateObjectId');

// api/comments/
router.route('/')
.post(verifyToken,createCommentCtrl)
.get(verifyTokenAndAdminHeaders,getCommentsCtrl)

// api/comments/:id
router.route('/:id')
.delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)




module.exports = router ;