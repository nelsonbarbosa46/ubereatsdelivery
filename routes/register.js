const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const multer = require('multer');

//handling with upload image (on createMerchant)
const storage = multer.diskStorage({
    //destination to upload
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    //filename destination
    filename: function (req, file, cb) {
        let date = new Date();
        //time to milliseconds  
        date = date.getTime();
        //auxiliary variable to save changes when replace SPACES with "-" 
        let auxFileName = file.originalname.replace(/[^A-Z0-9]+/ig, "-");
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

router.post('/signupAdmin', registerController.createAdmin);

router.post('/signupClientDriver', registerController.createClientDriver);

router.post('/signupMerchant', upload.single('logo'), registerController.createMerchant);

module.exports = router;