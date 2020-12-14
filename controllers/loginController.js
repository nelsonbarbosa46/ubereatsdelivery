const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    
    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;

    var sql = `SELECT * FROM user WHERE email = ?`;

    db.get(sql, [email], async function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'POST',
                        description: 'Iniciar Sessão'
                    }
                }
                res.status(500).send(response);
            } else {
                //check if has rows
                if (row) {
                    //check if password is correct
                    if (await bcrypt.compareSync(password, row.password)) {
                        
                        var typeUser = row.typeUser;
                        
                        var token = jwt.sign({
                            typeUser: typeUser,
                            email: email,
                            password: password
                        }, 'privateKey', {
                            expiresIn:'5h'
                        })

                        let response = {
                            message: "success",
                            login: {
                                email: email,
                                token: token
                            },
                            request: {
                                type: 'POST',
                                description: 'Iniciar Sessão'
                            }
                        }
                        
                        res.status(201).send(response);
                    } else {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'POST',
                                description: 'Iniciar Sessão'
                            }
                        }
                        res.status(500).send(response);
                    }
                } else {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Iniciar Sessão'
                        }
                    }
                    res.status(500).send(response);
                }
            }
        }
    )

    db.close();

    return;
}