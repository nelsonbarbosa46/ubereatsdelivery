const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const personValid = require('../middleware/checkPersonValid');

router.post('/newReservation', orderController.newReservation);

router.delete('/deleteReservation/:id/:idOrder', personValid, orderController.deleteReservation);

router.put('/payReservation/:id/:idOrder', personValid, orderController.payReservation);

router.put('/doneOrder/:id/:idOrder', personValid, orderController.doneOrder);

router.get('/merchantOrders/:idMerchant', orderController.merchantOrders);

router.get('/showOrderDone', orderController.showOrderDone);

router.get('/clientReservation/:idClient', orderController.clientReservation);

router.get('/clientReservationDone/:idClient', orderController.clientReservationDone);

module.exports = router;