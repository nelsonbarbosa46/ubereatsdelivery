const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const personValid = require('../middleware/checkPersonValid');

router.get('/', userController.getUsers);

router.put('/changeEP/:id', personValid, userController.changeEmailPassword);

router.get('/infoUser/:id', personValid, userController.getInfoUser);

module.exports = router;
