const jwt = require('jsonwebtoken');

exports.newDelivery = (req, res, next) => {

    var db = require('../sql').db();

    var id = req.body.id;
    var idOrder = req.body.idOrder;
    var canWork = 1;
    var itsDelivered = 0;
    var itsDone = 1;

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

        if (decoded.typeUser != 1 || decoded.id != id) {
            let response = {
                message: "failed",
                typeError: "Token inválido ou ID inválido",
                request: {
                    type: 'POST',
                    description: 'Fazer uma entrega'
                }
            }
            res.status(401).json(response);
        } else if (!idOrder) {
            let response = {
                message: "failed",
                typeError: "Campo vazio",
                request: {
                    type: 'POST',
                    description: 'Fazer uma entrega'
                }
            }
            res.status(400).json(response);
        } else {
            var sql = `SELECT driver.id AS "id" FROM driver INNER JOIN client ON driver.idClient = client.id WHERE client.idUser = ?
            AND driver.canWork = ?`;
            db.get(sql, [id, canWork], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'POST',
                            description: 'Fazer uma entrega'
                        }
                    }
                    res.status(500).json(response);
                } else {
                    //check if its defined
                    if (row) {
                        var idDriver = row.id;
                        sql = `SELECT id FROM orderReservation WHERE id = ? AND itsDone = ?`;
                        db.get(sql, [idOrder, itsDone], function (err, row) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'POST',
                                        description: 'Fazer uma entrega'
                                    }
                                }
                                res.status(500).json(response);
                            //check if exists
                            } else if (row) {
                                sql = `INSERT INTO delivery(idOrder, idDriver, itsDelivered) VALUES (?,?,?)`;
                                db.run(sql, [idOrder, idDriver, itsDelivered], function (err) {
                                    if (err) {
                                        let response = {
                                            message: "failed",
                                            typeError: "Erro na BD",
                                            request: {
                                                type: 'POST',
                                                description: 'Fazer uma entrega'
                                            }
                                        }
                                        res.status(500).json(response);
                                    } else {
                                        let response = {
                                            message: "success",
                                            delivery: {
                                                idOrder: idOrder,
                                                idDriver: idDriver,
                                                itsDelivered: itsDelivered
                                            },
                                            request: {
                                                type: 'POST',
                                                description: 'Fazer uma entrega'
                                            }
                                        }
                                        res.status(201).json(response);
                                    }
                                });
                            } else {
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'POST',
                                        description: 'Fazer uma entrega'
                                    }
                                }
                                res.status(500).json(response);
                            }
                        });
                        
                    } else {
                        let response = {
                            message: "failed",
                            typeError: "ID inválido",
                            request: {
                                type: 'POST',
                                description: 'Fazer uma entrega'
                            }
                        }
                        res.status(500).json(response);
                    }
                }
            });
    
            db.close();
        }
    }
    
    

    return;
}

exports.doneDelivery = (req, res, next) => {

    var idOrder = req.params.idOrder;
    var id = req.params.id;
    var itsDelivered = req.body.itsDelivered;
    var canWork = 1;


    if (!itsDelivered || !idOrder) {
        let response = {
            message: "failed",
            typeError: "Algum campo está vazio",
            request: {
                type: 'PUT',
                description: 'Concluir uma entrega'
            }
        }
        res.status(400).json(response);
    } else if (itsDelivered != 1) {
        let response = {
            message: "failed",
            typeError: "Campo 'itsDelivered' está inválido. Sugestão, coloque '1'",
            request: {
                type: 'PUT',
                description: 'Concluir uma entrega'
            }
        }
        res.status(400).json(response);
    } else {
        
        var db = require('../sql').db();

        var sql = `SELECT driver.id AS "id" FROM driver INNER JOIN client ON driver.idClient = client.id WHERE client.idUser = ?
        AND driver.canWork = ?`;

        db.get(sql, [id, canWork], function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    typeError: "Erro na BD",
                    request: {
                        type: 'POST',
                        description: 'Concluir uma entrega'
                    }
                }
                res.status(500).json(response);
            } else {
                if (row) {
                    sql = `UPDATE delivery SET itsDelivered = ? WHERE idOrder = ?`;
                    db.run(sql, [itsDelivered, idOrder], function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                typeError: "Erro na BD",
                                request: {
                                    type: 'POST',
                                    description: 'Concluir uma entrega'
                                }
                            }
                            res.status(500).json(response);
                        } else {
                            let response = {
                                message: "success",
                                typeSuccess: "Concluída com sucesso",
                                request: {
                                    type: 'POST',
                                    description: 'Concluir uma entrega'
                                }
                            }
                            res.status(200).json(response);
                        }
                    });
                } else {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'POST',
                            description: 'Concluir uma entrega'
                        }
                    }
                    res.status(500).json(response);
                }
            }
        });
    
    
        db.close();
    }

    return;
}

exports.getDeliveriesClient = (req, res, next) => {

    var id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    //check it typeUser is incorrect
    if (decoded.typeUser != 0 && decoded.typeUser != 1) {
        let response = {
            message: "failed",
            typeError: "Token inválido",
            request: {
                type: 'GET',
                description: 'Obter entregas de um cliente'
            }
        }
        //typeUser is incorrect
        res.status(401).json(response)
    //check if its empty
    } else {

        function getDeliveriesClientSQL() {
            return new Promise ((resolve, reject) => {
                var db = require("../sql").db();
                var itsDone = 1;
                var sql = `SELECT delivery.id, delivery.idOrder, delivery.itsDelivered FROM delivery 
                INNER JOIN orderReservation ON delivery.idOrder = orderReservation.id 
                INNER JOIN client ON orderReservation.idClient = client.id 
                WHERE client.idUser = ? AND orderReservation.itsDone = ?`;

                var query = [];

                db.each(sql, [id, itsDone], function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        query.push(
                            {
                                idDelivery: row.id,
                                idOrder: row.idOrder,
                                itsDelivered: row.itsDelivered
                            }
                        );
                    } 
                }, function (err) {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(query);
                    }
                });
            });
        }

        getDeliveriesClientSQL().then(function (data) {
            let response = {
                message: "success",
                listDeliveries: data,
                request: {
                    type: 'GET',
                    description: 'Obter entregas de um cliente'
                }
            };
            //successful
            res.status(200).json(response);
        //got a error 
        }).catch(function () {
            let response = {
                message: "failed",
                typeError: "Erro na BD",
                request: {
                    type: 'GET',
                    description: 'Obter entregas de um cliente'
                }
            }
            //error selecting
            res.status(500).json(response)
        });
    }

    return;
}

exports.getDeliveriesMerchant = (req, res, next) => {

    var id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    //check it typeUser is incorrect
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            typeError: "Token inválido",
            request: {
                type: 'GET',
                description: 'Obter entregas de uma empresa'
            }
        }
        //typeUser is incorrect
        res.status(401).json(response)
    //check if its empty
    } else {

        function getDeliveriesMerchantSQL() {
            return new Promise ((resolve, reject) => {
                var db = require("../sql").db();
                var itsDone = 1;
                var sql = `SELECT delivery.id, delivery.idOrder, delivery.itsDelivered FROM delivery 
                INNER JOIN orderReservation ON delivery.idOrder = orderReservation.id 
                INNER JOIN merchant ON orderReservation.idMerchant = merchant.id 
                WHERE merchant.idUser = ? AND orderReservation.itsDone = ?`;

                var query = [];

                db.each(sql, [id, itsDone], function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        query.push(
                            {
                                idDelivery: row.id,
                                idOrder: row.idOrder,
                                itsDelivered: row.itsDelivered
                            }
                        );
                    } 
                }, function (err) {
                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(query);
                    }
                });
            });
        }

        getDeliveriesMerchantSQL().then(function (data) {
            let response = {
                message: "success",
                listDeliveries: data,
                request: {
                    type: 'GET',
                    description: 'Obter entregas de uma empresa'
                }
            };
            //successful
            res.status(200).json(response);
        //got a error 
        }).catch(function () {
            let response = {
                message: "failed",
                typeError: "Erro na BD",
                request: {
                    type: 'GET',
                    description: 'Obter entregas de uma empresa'
                }
            }
            //error selecting
            res.status(500).json(response)
        });
    }

    return;
}