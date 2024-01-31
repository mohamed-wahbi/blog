const express = require('express');
const { createPostCtrl, getAllPostsCtrl, getSingelPostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggelLikeCtrl } = require('../controllers/postesController');
const uploadFile = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId.js');
const router = express.Router();



// api/posts/
router.route('/')
.post(verifyToken,uploadFile.single('image'),createPostCtrl)
.get(getAllPostsCtrl)

// api/posts/count
router.route("/count").get(getPostCountCtrl)

// api/posts/:id
router.route("/:id")
.get(validateObjectId,getSingelPostCtrl)
.delete(validateObjectId,verifyToken,deletePostCtrl)
.put(validateObjectId,verifyToken,updatePostCtrl)


// api/posts/upload-image/:id
router.route('/upload-image/:id')
.put(validateObjectId,verifyToken,uploadFile.single("image"),updatePostImageCtrl);

// api/posts/like/:id
router.route('/like/:id').put(validateObjectId,verifyToken,toggelLikeCtrl);


module.exports = router ;