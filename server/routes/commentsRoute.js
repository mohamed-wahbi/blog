const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { createCommentCtrl } = require('../controllers/commentsController');
const router = express.Router();

// api/comments/
router.route('/')
.post(verifyToken,createCommentCtrl);








module.exports = router ;