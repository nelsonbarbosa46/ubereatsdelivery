const jwt = require('jsonwebtoken');

exports.newReservation = (req, res, next) => {

    var idUser = req.body.idUser;
    var idMerchant = req.body.idMerchant;
    var idProduct = req.body.idProduct;
    var quantity = req.body.quantity;
    var parseQuantity = parseInt(quantity);
    var itsPaid = 0;
    var itsDone = 0;

    //check if fields are valid
    
    const tokenUnsplited = req.headers.authorization;
    if (!tokenUnsplited) {
        let response = {
            "message": "failed",
            "description": "You don't have permissions!"
        };
        res.status(401).json(response);
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        //check if typeUser is equal to 0/1 (type Client) and if idMerchant is equal to id inside a token
        if ((decoded.typeUser != 0 && decoded.typeUser != 1) || decoded.id != idUser) {
            let response = {
                message: "failed",
                "typeError": "Token inválido ou ID inválido",
                request: {
                    type: 'POST',
                    description: 'Criar uma reserva'
                }
            }
            //typeUser or id is invalid
            res.status(401).json(response)
        } else if (!idProduct || !quantity || !parseQuantity || !idMerchant){
            let response = {
                message: "failed",
                typeError: "Algum campo está vazio",
                request: {
                    type: 'POST',
                    description: 'Criar uma reserva'
                }
            }
            res.status(400).json(response)
        } else if (idMerchant < 0 || idProduct < 0 || !parseQuantity || quantity < 0) {
            let response = {
                message: "failed",
                typeError: "Algum campo está inválido",
                request: {
                    type: 'POST',
                    description: 'Criar uma reserva'
                }
            }
            res.status(400).json(response)
        } else {
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
                        } else {
                            //check if its empty
                            if (!row) {
                                let response = {
                                    message: "failed",
                                    typeError: "Não encontrou com o ID Product que colocou",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma reserva'
                                    }
                                }
                                res.status(400).json(response);
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
                        }
                    });
                }
            });
        
            db.close();
        }
    }

    return;
}

exports.clientReservation = (req, res, next) => {
    var idClient = req.params.idClient;

    var db = require('../sql').db();
    var sql = `SELECT * FROM orderReservation WHERE idClient = ?`;

    db.all(sql, [idClient], function(err, rows){
        if(err){
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'RESERVAS DE UM CLIENTE'
                }
            }
            res.status(500).json(response);
        } else {
            let response = {
                message: "success",
                result: rows,
                request: {
                    type: 'GET',
                    description: 'RESERVAS DE UM CLIENTE'
                }
            }
            res.status(200).json(response);
        }
        db.close();
    });
    return;
}

exports.clientReservationDone = (req, res, next) => {
    var idClient = req.params.idClient;
    var itsDone = 1;

    var db = require('../sql').db();
    var sql = `SELECT * FROM orderReservation WHERE idClient = ? AND itsDone = ?`;

    db.all(sql, [idClient, itsDone], function(err, rows){
        if(err){
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'RESERVAS DE UM CLIENTE'
                }
            }
            res.status(500).json(response);
        } else {
            let response = {
                message: "success",
                result: rows,
                request: {
                    type: 'GET',
                    description: 'RESERVAS DE UM CLIENTE'
                }
            }
            res.status(200).json(response);
        }
        db.close();
    });
    return;
}

exports.showOrderDone = (req, res, next) => {
    var itsDone = 1;

    var db = require('../sql').db();
    var sql = `SELECT * FROM orderReservation WHERE itsDone = ?`;

    db.all(sql, [itsDone], function(err, rows){
        if(err){
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'SELECIONAR ENCOMENDAS PRONTAS'
                }
            }
            res.status(500).json(response);
        } else {
            let response = {
                message: "success",
                result: rows,
                request: {
                    type: 'GET',
                    description: 'SELECIONAR ENCOMENDAS PRONTAS'
                }
            }
            res.status(200).json(response);
        }
        db.close();
    });
    return;
}

exports.merchantOrders = (req, res, next) => {
    var idMerchant = req.params.idMerchant;

    var db = require('../sql').db();
    var sql = `SELECT * FROM orderReservation WHERE idMerchant = ?`;

    db.all(sql, [idMerchant], function(err, rows){
        if(err){
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'SELECIONAR ENCOMENDAS RECEBIDAS'
                }
            }
            res.status(500).json(response);
        } else {
            let response = {
                message: "success",
                result: rows,
                request: {
                    type: 'GET',
                    description: 'SELECIONAR ENCOMENDAS RECEBIDAS'
                }
            }
            res.status(200).json(response);
        }
        db.close();
    });
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

    var id = req.params.id;
    var idOrder = req.params.idOrder;
    var itsPaid = req.body.itsPaid;

    if (!idOrder || !itsPaid) {
        let response = {
            message: "failed",
            typeError: "Algum campo está vazio",
            request: {
                type: 'PUT',
                description: 'Pagar uma reserva'
            }
        }
        res.status(400).json(response);
    } else if (itsPaid != 1) {
        let response = {
            message: "failed",
            typeError: "Campo 'itsPaid' está inválido. Sugestão, coloque '1'",
            request: {
                type: 'PUT',
                description: 'Pagar uma reserva'
            }
        }
        res.status(400).json(response);
    } else {
        var db = require('../sql').db();

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
    }
    
    return;
}

exports.doneOrder = (req, res, next) => {

    var idOrder = req.params.idOrder;
    var idUser = req.params.id;
    var itsDone = req.body.itsDone;

    if (!idOrder || !itsDone) {
        let response = {
            message: "failed",
            typeError: "Algum campo está vazio",
            request: {
                type: 'PUT',
                description: 'Concluir uma encomenda'
            }
        }
        res.status(400).json(response);
    } else if (itsDone != 1) {
        let response = {
            message: "failed",
            typeError: "Campo 'itsDone' está inválido. Sugestão, coloque '1'",
            request: {
                type: 'PUT',
                description: 'Concluir uma encomenda'
            }
        }
        res.status(400).json(response);
    } else {
        var db = require('../sql').db();

        var sql = `SELECT id FROM merchant WHERE idUser = ?`;
        db.get(sql, [idUser], function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    typeError: "Erro na BD",
                    request: {
                        type: 'PUT',
                        description: 'Concluir uma encomenda'
                    }
                }
                res.status(500).json(response);
            } else {
                //check if its defined
                if (row) {
                    var idMerchant = row.id;
                    sql = `UPDATE orderReservation SET itsDone = ? WHERE id = ? AND idMerchant = ?`;
                    db.run(sql, [itsDone, idOrder, idMerchant], function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                typeError: "Erro na BD",
                                request: {
                                    type: 'PUT',
                                    description: 'Concluir uma encomenda'
                                }
                            }
                            res.status(500).json(response);
                        } else {
                            if (this.changes == 1) {
                                let response = {
                                    message: "success",
                                    order: {
                                        itsDone: itsDone
                                    },
                                    request: {
                                        type: 'PUT',
                                        description: 'Concluir uma encomenda'
                                    }
                                }
                                res.status(200).json(response);
                            } else {
                                let response = {
                                    message: "failed",
                                    typeError: "Poderá ter posto ID da encomenda/reserva errado",
                                    request: {
                                        type: 'PUT',
                                        description: 'Concluir uma encomenda'
                                    }
                                }
                                res.status(400).json(response);
                            }
                        }
                    });
                } else {
                    let response = {
                        message: "failed",
                        typeError: "Não encontrou com esse ID de utilizador",
                        request: {
                            type: 'PUT',
                            description: 'Concluir uma encomenda'
                        }
                    }
                    res.status(400).json(response);
                }
            }
        });
        
        db.close();    
    }

    return;
}