const express = require('express');
const { verifyToken, verifyTokenAndAdminHeaders } = require('../middlewares/verifyToken');
const { createCommentCtrl, getCommentsCtrl } = require('../controllers/commentsController');
const router = express.Router();

// api/comments/
router.route('/')
.post(verifyToken,createCommentCtrl)
.get(verifyTokenAndAdminHeaders,getCommentsCtrl)







module.exports = router ;