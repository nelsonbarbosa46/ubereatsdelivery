const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const personValid = require('../middleware/checkPersonValid');
const merchantValid = require('../middleware/checkMerchantValid');

//handling with upload image (on createMerchant)
const storage = multer.diskStorage({
    //destination to upload
    destination: function (req, file, cb) {
        cb(null, './public/upload/');
    },
    //filename destination
    filename: function (req, file, cb) {
        let date = new Date();
        //time to milliseconds  
        date = date.getTime();
        //auxiliary variable to save changes when replace SPACES with "-" 
        let auxFileName = file.originalname.replace(/[^A-Z0-9]+/ig, "-");

        //check type file to add type on the file
        switch (file.mimetype) {
            case 'image/png':
                auxFileName = auxFileName + '.png';
                break;
            case 'image/jpeg':
                auxFileName = auxFileName + '.jpeg';
                break;
            case 'image/jpg':
                auxFileName = auxFileName + '.jpg';
                break;
            default:
                break;
        }
        cb(null, date + '-' + auxFileName);
    }
});
//filtering types of upload (only accept jpeg, jpg and png)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        //only accepting 2MB
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});

router.post('/createProduct/', upload.single('logo'), merchantValid, productController.createProduct);

router.put('/changeInfoProduct/:id/:idProduct', merchantValid, productController.changeInfoProduct);

router.put('/changeLogoProduct/:id/:idProduct', merchantValid, upload.single('logo'), productController.changeLogoProduct);

router.get('/getProductsMe/:id', personValid, merchantValid, productController.getProductsMe);

router.delete('/deleteProduct/:id/:idProduct', merchantValid, productController.deleteProduct);

router.put('/changeQuantityProduct/:id/:idProduct', merchantValid, productController.changeQuantityProduct);

router.get('/showProducts/:idMerchant', productController.showProducts);

module.exports = router;