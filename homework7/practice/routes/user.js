const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const SelfieController = require('../controllers/selfie');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
// const upload = multer({
//     dest: 'upload/'
// });

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);

router.post('/selfies', AuthMiddleware.checkToken, upload.array('selfies', 4), SelfieController.updateSelfies);


module.exports = router;