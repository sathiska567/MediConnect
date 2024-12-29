const express = require('express');
const { authController, authLoginController } = require('../controller/authController');

const router = express.Router();


// set register controller
router.post("/register",authController)

// set login controller
router.post("/login",authLoginController)

module.exports = router;