
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

exports.createAdmin = async (req, res, next) => {

    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var name = req.body.name;

    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    var typeUser = 3;

    //create hash
    const hash = await bcrypt.hashSync(password, 10);

    let sql = `INSERT INTO user(email, password, address, zipCode, location, typeUser)
    VALUES (?, ?, ?, ?, ?, ?)`;

    //execute sql command
    db.run(sql, [email, hash, address, zipCode, location , typeUser],
        function (err) {
            if (!err) {
                let id = this.lastID;
                sql = `INSERT INTO admin(idUser, name) VALUES (?, ?)`;
                db.run(sql, [id, name], 
                    function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                request: {
                                    type: 'POST',
                                    description: 'Criar um administrador'
                                }
                            }
                            //error inserting on table admin
                            res.status(500).send(response);
                        } else {
                            let response = {
                                message: "success",
                                userCreated: {
                                    email: email,
                                    name: name
                                },
                                request: {
                                    type: 'POST',
                                    description: 'Criar um administrador'
                                }
                            }

                            //status 201 because was inserted in both of the tables
                            res.status(201).send(response);
                        }
                    }
                )
            } else {
                let response = {
                    message: "failed",
                    request: {
                        type: 'POST',
                        description: 'Criar um administrador'
                    }
                }
                //error inserting on table user
                res.status(500).send(response);
            }
        }   
    )

    //close connection
    db.close();

    return;
}

exports.createClientDriver = async (req, res, next) => {

    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var name = req.body.name;
    var nif = req.body.nif;
    var contactNumber = req.body.contactNumber;
    var isDriver = req.body.isDriver;
    //exists if isDriver = 1
    var typeVehicle = req.body.typeVehicle;
    //default on canWork and isChecked when is created
    var canWork = 0;
    var isChecked = 0;

    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    var typeUser;

    function checkIfWantsBeDriver(isDriver, id, typeVehicle, canWork, isChecked, name) {
        if (isDriver === 1) {
            sql = `INSERT INTO driver(idClient, typeVehicle, canWork, isChecked) VALUES (?,?,?,?)`;
            db.run(sql, [id, typeVehicle, canWork, isChecked], 
                function (err) {
                    if (err) {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'POST',
                                description: 'Criar um cliente/condutor'
                            }
                        };
                        //error inserting on table driver
                        res.status(500).json(response)
                    } else {
                        let response = {
                            message: "success",
                            userCreated: {
                                email: email,
                                name: name
                            },
                            request: {
                                type: 'POST',
                                description: 'Criar um cliente/condutor'
                            }
                        }
                        //status 200 because was inserted in both of the tables
                        res.status(200).send(response)
                    }
                }
            ) 
        } else {
            let response = {
                message: "success",
                userCreated: {
                    email: email,
                    name: name
                },
                request: {
                    type: 'POST',
                    description: 'Criar um cliente/condutor'
                }
            }
            //status 200 because was inserted in both of the tables
            res.status(200).send(response)
        }
    }

    const hash = await bcrypt.hashSync(password, 10);

    //check if value is right on isDriver; 
    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    if (isDriver === 1) {
        typeUser = 1;
    } else {
        typeUser = 0;
    }

    var sql = `INSERT INTO user(email, password, address, zipCode, location, typeUser)
    VALUES (?, ?, ?, ?, ?, ?)`;

    //execute sql command
    db.run(sql, [email, hash, address, zipCode, location, typeUser],
        function (err) {
            if (!err) {
                let id = this.lastID;
                sql = `INSERT INTO client(idUser, name, nif, contactNumber, isDriver)
                VALUES (?, ?, ?, ?, ?)`;
                db.run(sql, [id, name, nif, contactNumber, isDriver],
                    function (err) {
                        if (!err) {
                            let id = this.lastID;
                            //function to check if client want to be a driver
                            checkIfWantsBeDriver(isDriver, id, typeVehicle, canWork, isChecked, name);
                        } else {
                            let response = {
                                message: "failed",
                                request: {
                                    type: 'POST',
                                    description: 'Criar um cliente/condutor'
                                }
                            };
                            //error inserting on table admin
                            res.status(500).send(response)
                        }
                    }
                )
            } else {
                //error inserting on table user
                let response = {
                    message: "failed",
                    request: {
                        type: 'POST',
                        description: 'Criar um cliente/condutor'
                    }
                };
                res.status(500).send(response)
            }
        }
        
    )

    return;
}

exports.createMerchant = (req, res, next) => {
    
    

    return;
}