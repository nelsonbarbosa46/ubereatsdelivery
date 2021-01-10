const jwt = require('jsonwebtoken');

exports.createProduct = (req, res, next) => {
    
    var idUser = req.body.idUser;
    var idMerchant = req.body.idMerchant;
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var parseQuantity = parseInt(quantity);
    var description = req.body.description;
    var logo = req.file;

    const tokenUnsplited = req.headers.authorization;
    //check if token is empty
    if (!tokenUnsplited) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um produto'
            }
        }
        //token empty
        res.status(401).json(response)
    } else {    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        //check if typeUser is equal to 2 (type Merchant) and if idMerchant is equal to id inside a token
        if (decoded.typeUser != 2 || decoded.id != idUser) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //typeUser or id is invalid
            res.status(401).json(response)
        //check if any field is empty
        } else if (!name || !price || !quantity) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //some field is empty
            res.status(400).json(response)
        //check if quantity is invalid
        } else if (!parseQuantity || quantity < 0) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //quantity is invalid
            res.status(400).json(response)
        //check if price is invalid
        } else if (isNaN(price) || price < 0) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //price is invalid
            res.status(400).json(response)
        } else {
            //check if empty
            if (!logo) {
                logo = null;
            } else {
                logo = req.file.path;
            }

            //check if its empty
            if (!description) {
                description = null;
            }

            var db = require('../sql').db();
            var sql = `SELECT name FROM product WHERE name = ? AND idMerchant = ?`;
            db.get(sql, [name, idMerchant], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar um produto'
                        }
                    }
                    //error selecting
                    res.status(500).json(response)
                } else {
                    if (row) {
                        let response = {
                            message: "failed",
                            typeError: "o nome do produto já existe",
                            request: {
                                type: 'POST',
                                description: 'Criar um produto'
                            }
                        }
                        //product already exists
                        res.status(500).json(response)
                    } else {
                        sql = `INSERT INTO product(idMerchant, name, price, quantity, description, image) VALUES 
                        (?, ?, ?, ?, ?, ?)`;
                        db.run(sql, [idMerchant, name, price, quantity, description, logo], function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um produto'
                                    }
                                }
                                //error inserting
                                res.status(500).json(response)
                            } else {
                                let response = {
                                    message: "success",
                                    newProduct: {
                                        name: name,
                                        price: price,
                                        quantity: quantity,
                                        description: description
                                    },
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma empresa'
                                    }
                                }
                                res.status(201).json(response)
                            }
                        })
                    }
                }
            });

            db.close();
        }
    }


    

    return;
}