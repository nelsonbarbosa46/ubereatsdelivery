const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const personValid = require('../middleware/checkPersonValid');

router.post('/newDelivery', deliveryController.newDelivery);

module.exports = router;