const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
/*
    sign up
    METHOD: POST
    URI: localhost:3000/api/user/signup
    REQUEST BODY: id, name, password, email
    RESPONSE STATUS: 200(OK)
    RESPONSE DATA: All user data
*/

router.post('/signup', userController.signup);

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', userController.signin);
/* 
  ✔️ get profile
  METHOD : GET
  URI : localhost:3000/user/profile/:id
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : User Id, name, email
*/
router.get('/profile/:id', userController.readProfile);


module.exports = router;
