const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const personValid = require('../middleware/checkPersonValid');

router.post('/newReservation', orderController.newReservation);

module.exports = router;