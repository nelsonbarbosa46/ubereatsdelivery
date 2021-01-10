const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.get);

router.put('/changeInfoProduct/:id/:idProduct', productController.changeInfoProduct);

module.exports = router;