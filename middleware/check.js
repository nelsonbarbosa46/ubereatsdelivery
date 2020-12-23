const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/checkTokenInitialPage', (req, res, next) => {
    let token = req.body.token;

    try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded);
        //select what page to redirect
        switch (decoded.typeUser) {
            //client
            case 0:
                response = {
                    "message": "success",
                    "pageRedirect": "/client/",
                    "request": {
                        "type": 'POST',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
        
            //driver
            case 1:
                response = {
                    "message": "success",
                    "pageRedirect": "/client/",
                    "request": {
                        "type": 'POST',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            
            //merchant
            case 2:
                response = {
                    "message": "success",
                    "pageRedirect": "/merchant/",
                    "request": {
                        "type": 'POST',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            //administrator
            case 3:
                response = {
                    "message": "success",
                    "pageRedirect": "/admin/",
                    "request": {
                        "type": 'POST',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            //super administrator
            case 4:
                response = {
                    "message": "success",
                    "pageRedirect": "/admin/",
                    "request": {
                        "type": 'POST',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            default:
                response = {
                    "message": "failed",
                    "request": {
                        "type": "POST",
                        "description": "Verificar o Token na página inicial"
                    }
                }
                res.status(400).json(response);
                break;
        }
    } catch (err) {
        let response = {
            "message": "failed",
            "request": {
                "type": "POST",
                "description": "Verificar o Token na página inicial"
            }
        }
        res.status(400).json(response);
    }
    return;
});

module.exports = router;