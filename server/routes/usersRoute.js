const express = require('express');
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, profilePhotoUploadCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenQuery } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId.js');
const uploadFile = require('../middlewares/photoUpload.js');
const router = express.Router();


    // api/users/profile
    router.get('/profile',verifyTokenAndAdmin,getAllUsersCtrl)
    // api/users/profile/:id
    router.route('/profile/:id')
    .get(validateObjectId,getUserProfileCtrl)
    .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)

    //api/users/profile/profile-photo-upload
    router.route('/profile/profile-photo-upload')
    .post(verifyTokenQuery ,uploadFile.single('image'), profilePhotoUploadCtrl)

module.exports=router;
