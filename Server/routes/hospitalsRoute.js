const express = require('express');
const { hospitalsController } = require('../controller/hospitalsController');

const router = express.Router();


// set hospitals controller
router.get("/hospitals",hospitalsController)

module.exports = router;