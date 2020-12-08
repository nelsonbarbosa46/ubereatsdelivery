const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const multer = require('multer');

router.post('/signupAdmin', registerController.createAdmin);

router.post('/signupClientDriver', registerController.createClientDriver);

router.post('/signupMerchant', registerController.createMerchant);

module.exports = router;