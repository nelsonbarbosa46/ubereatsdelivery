const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', registerController.createAdmin);

module.exports = router;