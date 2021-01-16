

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
                typeError: "Erro na BD",
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
                        typeError: "Erro na BD",
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
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma reserva'
                                    }
                                }
                                res.status(500).json(response);
                            } else {
                                var idOrder = this.lastID;
                                var newQuantity = quantityAvai - quantity;
                                sql = `UPDATE product SET quantity = ? WHERE id = ?`;
                                db.run(sql, [newQuantity, idProduct], function (err) {
                                    if (err) {
                                        let response = {
                                            message: "failed",
                                            typeError: "Erro na BD",
                                            request: {
                                                type: 'POST',
                                                description: 'Criar uma reserva'
                                            }
                                        }
                                        res.status(500).json(response);
                                    } else {
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
                                });
                            }
                        })
                    }
                }
            });
        }
    });

    db.close();

    return;
}

exports.deleteReservation = (req, res, next) => {

    var id = req.params.id;
    var idOrder = req.params.idOrder;

    var db = require('../sql').db();
    var sql = `SELECT id FROM client WHERE idUser = ?`;
    
    db.get(sql, [id], function (err, row) {
        if (err) {
            let response = {
                message: "failed",
                typeError: "Erro na BD",
                request: {
                    type: 'DELETE',
                    description: 'Eliminar uma reserva'
                }
            }
            res.status(500).json(response);
        } else {
            var idClient = row.id;
            var itsPaid = 0;
            sql = `SELECT orderReservation.quantity, orderReservation.idProduct, product.quantity AS "quantityAvai" 
            FROM orderReservation 
            INNER JOIN product ON orderReservation.idProduct=product.id WHERE orderReservation.id = ?`;
            db.get(sql, [idOrder], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'DELETE',
                            description: 'Eliminar uma reserva'
                        }
                    }
                    res.status(500).json(response);
                } else {
                    //check if its defined
                    if (row) {
                        var quantity = row.quantity;
                        var quantityAvai = row.quantityAvai;
                        var idProduct = row.idProduct;
                        sql = `DELETE FROM orderReservation WHERE id = ? AND idClient = ? AND itsPaid = ?`;
                        db.run(sql, [idOrder, idClient, itsPaid], function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'DELETE',
                                        description: 'Eliminar uma reserva'
                                    }
                                }
                                res.status(500).json(response);
                            } else {
                                if (this.changes == 1) {
                                    var newQuantity = quantityAvai + quantity;
                                    sql = `UPDATE product SET quantity = ? WHERE id = ?`;
                                    db.run(sql, [newQuantity, idProduct], function (err) {
                                        if (err) {
                                            let response = {
                                                message: "failed",
                                                typeError: "Erro na BD4",
                                                request: {
                                                    type: 'DELETE',
                                                    description: 'Eliminar uma reserva'
                                                }
                                            }
                                            res.status(500).json(response);
                                        } else {
                                            res.status(204).json(); 
                                        }
                                    });  
                                } else {
                                    let response = {
                                        message: "failed",
                                        typeError: "ID Cliente não é igual ao que está na reserva ou a reserva já está paga",
                                        request: {
                                            type: 'DELETE',
                                            description: 'Eliminar uma reserva'
                                        }
                                    }
                                    res.status(400).json(response);
                                }
                            }
                        });
                    } else {
                        let response = {
                            message: "failed",
                            typeError: "Erro na BD",
                            request: {
                                type: 'DELETE',
                                description: 'Eliminar uma reserva'
                            }
                        }
                        res.status(500).json(response);
                    }
                    
                }
            });
        } 
    });

    

    db.close();

    return;
}

exports.payReservation = (req, res, next) => {

    var db = require('../sql').db();

    var id = req.params.id;
    var idOrder = req.params.idOrder;
    var itsPaid = req.body.itsPaid;

    var sql = `SELECT id FROM client WHERE idUser = ?`;
    db.get(sql, [id], function (err, row) {
        if (err) {
            let response = {
                message: "failed",
                typeError: "Erro na BD",
                request: {
                    type: 'PUT',
                    description: 'Pagar uma reserva'
                }
            }
            res.status(500).json(response);
        } else {
            //check if defined
            if (row) {
                var idClient = row.id;
                sql = `UPDATE orderReservation SET itsPaid = ? WHERE id = ? AND idClient = ?`;
                db.run(sql, [itsPaid, idOrder, idClient], function (err) {
                    if (err) {
                        let response = {
                            message: "failed",
                            typeError: "Erro na BD",
                            request: {
                                type: 'PUT',
                                description: 'Pagar uma reserva'
                            }
                        }
                        res.status(500).json(response);
                    } else {
                        if (this.changes == 1) {
                            let response = {
                                message: "success",
                                order: {
                                    itsPaid: itsPaid
                                },
                                request: {
                                    type: 'PUT',
                                    description: 'Pagar uma reserva'
                                }
                            }
                            res.status(200).json(response);
                        } else {
                            let response = {
                                message: "failed",
                                typeError: "Poderá ter posto ID da encomenda/reserva errado",
                                request: {
                                    type: 'PUT',
                                    description: 'Pagar uma reserva'
                                }
                            }
                            res.status(400).json(response);
                        }
                    }
                });
            } else {
                let response = {
                    message: "failed",
                    typeError: "Não encontrou com esse ID",
                    request: {
                        type: 'PUT',
                        description: 'Pagar uma reserva'
                    }
                }
                res.status(400).json(response);
            }
        }
    });

    db.close();

    return;
}