
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

    //create hash
    const hash = await bcrypt.hashSync(password, 10);

    let sql = `INSERT INTO user(email, password, zipCode, location, typeUser)
    VALUES (?, ?, ?, ?, ?, ?)`;

    //execute sql command
    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    db.run(sql, [email, hash, address, zipCode, location , 3],
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
                                    email: email
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
                    message: "success",
                    userCreated: {
                        email: email
                    },
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