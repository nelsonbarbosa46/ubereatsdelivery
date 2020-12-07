const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const multer = require('multer');

router.post('/signupAdmin', registerController.createAdmin);

module.exports = router;