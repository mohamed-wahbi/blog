const express = require('express');
const { createPostCtrl, getAllPostsCtrl } = require('../controllers/postesController');
const uploadFile = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

// api/
router.route('/')
.post(verifyToken,uploadFile.single('image'),createPostCtrl)
.get(getAllPostsCtrl)



module.exports = router ;