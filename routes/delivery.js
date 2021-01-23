const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const personValid = require('../middleware/checkPersonValid');
const merchantValid = require('../middleware/checkMerchantValid');
const driverValid = require('../middleware/checkDriverValid');

router.post('/newDelivery', driverValid, deliveryController.newDelivery);

router.put('/doneDelivery/:id/:idOrder', personValid, driverValid, deliveryController.doneDelivery);

router.get('/getDeliveriesCl/:id', personValid, driverValid, deliveryController.getDeliveriesClient);

router.get('/getDeliveriesMe/:id', personValid, merchantValid, deliveryController.getDeliveriesMerchant);

module.exports = router;