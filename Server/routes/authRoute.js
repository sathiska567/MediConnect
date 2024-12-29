const express = require('express');
const { authController } = require('../controller/authController');

const router = express.Router();


// set controller
router.post("/register",authController)

module.exports = router;