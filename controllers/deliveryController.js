

exports.newDelivery = (req, res, next) => {

    var db = require('../sql').db();

    var id = req.body.id;
    var idOrder = req.body.idOrder;
    var canWork = 1;
    var itsDelivered = 0;
    var itsDone = 1;

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
                        description: 'Criar uma reserva'
                    }
                }
                res.status(500).json(response);
            }
        }
    });

    db.close();

    return;
}