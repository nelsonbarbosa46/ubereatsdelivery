

exports.newReservation = (req, res, next) => {

    var idUser = req.body.idUser;
    var idMerchant = req.body.idMerchant;
    var idProduct = req.body.idProduct;
    var quantity = req.body.quantity;
    var itsPaid = 0;
    var itsDone = 0;

    var db = require('../sql').db();

    var sql = `SELECT id FROM client WHERE idUser = ?`;
    db.get(sql, [idUser], function (err, row) {
        if (err) {
            let response = {
                message: "failed",
                typeError: "Erro na BD1",
                request: {
                    type: 'POST',
                    description: 'Criar uma reserva'
                }
            }
            res.status(500).json(response);
        } else {
            var idClient = row.id;
            sql = `SELECT quantity, price, idMerchant FROM product WHERE id = ?`;
            db.get(sql, [idProduct], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD2",
                        request: {
                            type: 'POST',
                            description: 'Criar uma reserva'
                        }
                    }
                    res.status(500).json(response);
                } else if (idMerchant != row.idMerchant) {
                    let response = {
                        message: "failed",
                        "typeError": "ID da Empresa recebido não coincide com o ID da empresa relacionado com o produto",
                        request: {
                            type: 'POST',
                            description: 'Criar uma reserva'
                        }
                    }
                    res.status(400).json(response);
                } else {
                    var quantityAvai = row.quantity;
                    var price = row.price;
                    //check if quantity insert is bigger then the quantity available
                    if (quantityAvai < quantity) {
                        let response = {
                            message: "failed",            
                            "typeError": "Não existe stock suficiente",
                            request: {
                                type: 'POST',
                                description: 'Criar uma reserva'
                            }
                        }
                        res.status(400).json(response);
                    } else {
                        //calculate price
                        var priceOrder = price * quantity;
                        sql = `INSERT INTO orderReservation(idClient, idMerchant, idProduct, quantity, price, itsPaid, itsDone) VALUES (?,?,?,?,?,?,?)`;
                        db.run(sql, [idClient, idMerchant, idProduct, quantity, priceOrder, itsPaid, itsDone], function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD3",
                                    err: err.message,
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma reserva'
                                    }
                                }
                                res.status(500).json(response);
                            } else {
                                var idOrder = this.lastID;
                                let response = {
                                    message: "success",
                                    reservation: {
                                        idOrder: idOrder,
                                        idClient: idClient,
                                        idMerchant: idMerchant,
                                        price: priceOrder,
                                        itsPaid: itsPaid
                                    },
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma reserva'
                                    }
                                }
                                res.status(201).json(response);
                            }
                        })
                    }
                }
            });
        }
    });

    return;
}