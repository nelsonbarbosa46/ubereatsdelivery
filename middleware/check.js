const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/checkTokenInitialPage', (req, res, next) => {
    let token = req.body.token;

    try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
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
                res.status(401).json(response);
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
        res.status(401).json(response);
    }
    return;
});

router.put('/checkToken/:id', (req, res, next) => {
    var typeUser = req.params.id;
    var token = req.body.token;

    try {
        //verify typeUser (to be correct typeUser comming from frontend is 0(client/driver), 2(merchant) and 3(admin/superadmin))
        //only accept 0 (client/driver),2 (merchant),3 (admin/superadmin)
        if (typeUser != 0 && typeUser != 2 && typeUser != 3) {
            throw "failed";
        }
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        var decTypeUser = decoded.typeUser;
        //select what page to redirect
        switch (decTypeUser) {
            //client
            case 0:
                if (decTypeUser != typeUser) {
                    throw "failed";
                }
                response = {
                    "message": "success",
                    "typeUser": typeUser,
                    "request": {
                        "type": 'PUT',
                        "description": 'Verificar o Token numa Página Reservada'
                    }
                }
                res.status(200).json(response);
                break;
        
            //driver
            case 1:
                //plus 1, because driver comming from frontend 0
                if (decTypeUser != (typeUser+1)) {
                    throw "failed";
                }
                response = {
                    "message": "success",
                    "typeUser": decTypeUser,
                    "request": {
                        "type": 'PUT',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            
            //merchant
            case 2:
                if (decTypeUser != typeUser) {
                    throw "failed";
                }
                response = {
                    "message": "success",
                    "typeUser": decTypeUser,
                    "request": {
                        "type": 'PUT',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            //administrator
            case 3:
                if (decTypeUser != typeUser) {
                    throw "failed";
                }
                response = {
                    "message": "success",
                    "typeUser": decTypeUser,
                    "request": {
                        "type": 'PUT',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            //super administrator
            case 4:
                //plus 1, because superadministrator comming from frontend 3
                if (decTypeUser != (typeUser+1)) {
                    throw "failed";
                }
                response = {
                    "message": "success",
                    "typeUser": decTypeUser,
                    "request": {
                        "type": 'PUT',
                        "description": 'Verificar o Token na página inicial'
                    }
                }
                res.status(200).json(response);
                break;
            default:
                response = {
                    "message": "failed",
                    "request": {
                        "type": "PUT",
                        "description": "Verificar o Token na página inicial"
                    }
                }
                res.status(401).json(response);
                break;
        }
    } catch (err) {
        let response = {
            "message": "failed",
            "request": {
                "type": "PUT",
                "description": "Verificar o Token na página inicial"
            }
        }
        res.status(401).json(response);
    }
    return;
});

module.exports = router;