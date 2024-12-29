const express = require('express');
const { authController, authLoginController, authOneUserDetailsController } = require('../controller/authController');

const router = express.Router();


// set register controller
router.post("/register",authController)

// set login controller
router.post("/login",authLoginController)


// get one user
router.post("/oneUser" , authOneUserDetailsController)

module.exports = router;