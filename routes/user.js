const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const personValid = require('../middleware/checkPersonValid');

router.get('/', userController.getUsers);

router.put('/changeEP/:id', personValid, userController.changeEmailPassword)

module.exports = router;
