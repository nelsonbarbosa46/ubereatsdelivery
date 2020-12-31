
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.getUsers = (req, res, next) => {

    var db = require('../sql').db();

    var sql = `SELECT * FROM user`;

    db.all(sql, function (err, rows) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'POST',
                        description: 'Iniciar Sessão'
                    }
                }
                res.status(500).json(response);
            } else {
                
                let response = {
                    message: "success",
                    result: rows,
                    request: {
                        type: 'GET',
                        description: 'Obter Utilizadores'
                    }
                }
                res.status(200).json(response);
                
            }
        }
    )

    db.close();

    return;
}

exports.changeEmailPassword = (req, res, next) => {

    var id = req.params.id;
    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;

    //check if fields are empty
    if (!email && !password && !repeatPassword) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar o e-mail/palavra passe'
            }
        };
        //all fields are empty
        res.status(400).json(response);
    //check if all fields are filled
    } else if (email && password && repeatPassword) {
        //check if password not have one lowercase, one upercase, one number, less than 8 chars,
        //more than 15 chars, password not equal to repeatPassword and email invalid
        if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15 || 
        password != repeatPassword || 
        !validateEmail(email)
        ) {
            let response = {
                message: "failed",
                request: {
                    type: 'PUT',
                    description: 'Alterar o e-mail/palavra passe'
                }
            };
            //password is not equal to repeatPassword or email is invalid or
            //password less than 8 chars or more then 15 chars or dont have one lowercase, one upercase, 
            //one number or less than 8 chars or more than 15 chars
            res.status(400).json(response);
        } else {
            changeEmailPassword(id, email, password);
        }
    //check if any field are filled
    } else if (email || password || repeatPassword) {
        //check if its empty
        if (!email) {
            //email empty, mean that user just want to change password 
            //check if password is not equal to repeatPassword or dont have one lowercase, one upercase, 
            //one number or less than 8 chars or more than 15 chars 
            if (
                password != repeatPassword ||
                password.match(/[a-z]/g) === null || 
                password.match(/[A-Z]/g) === null || 
                password.match(/[0-9]/g) === null || 
                password.length < 8 ||
                password.length > 15 
                ) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                };
                //password is not equal to repeatPassword or
                //password less than 8 chars or more then 15 chars or dont have one lowercase, one upercase, 
                //one number or less than 8 chars or more than 15 chars
                res.status(400).json(response);
            } else {
                //password not empty, mean that user just want to change password
                changePassword(id, password);
            }
        } else {
            //check if email is invalid
            if (!validateEmail(email)) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                };
                
                //email is invalid
                res.status(400).json(response);
            } else {
                //email not empty, mean that user just want to change email
                changeEmail(id, email);
            }
        } 
    } 
    

    function changeEmail(id, email) {
        var db = require('../sql').db();

        var sql = 'UPDATE user SET email = ? WHERE id = ?';

        db.run(sql, [email, id], function (err) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //error updating email
                res.status(500).json(response);
            } else {
                let response = {
                    message: "success",
                    newEmail: email,
                    idUser: id,
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //update successuful on table user
                res.status(200).json(response);
            }
        });

        db.close();
    }

    async function changePassword(id, password) {

        var db = require('../sql').db();

        //create hash
        var hash = await bcrypt.hashSync(password, 10);

        var sql = 'UPDATE user SET password = ? WHERE id = ?';

        db.run(sql, [hash, id], function (err) {
           if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //error updating password
                res.status(500).json(response);
           } else {
                let response = {
                    message: "success",
                    password: "*******",
                    idUser: id,
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //update successuful on table user
                res.status(200).json(response);
           }
        });

        db.close();
        
    }

    async function changeEmailPassword(id, email, password) {
        
        var db = require('../sql').db();

        //create hash
        var hash = await bcrypt.hashSync(password, 10);

        var sql = 'UPDATE user SET email = ?, password = ? WHERE id = ?';

        db.run(sql, [email, hash, id], function (err) {
           if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //error updating password and email
                res.status(500).json(response);
           } else {
                let response = {
                    message: "success",
                    password: "*******",
                    email: email,
                    idUser: id,
                    request: {
                        type: 'PUT',
                        description: 'Alterar o e-mail/palavra passe'
                    }
                }
                //update successuful on table user
                res.status(200).json(response);
           }
        });

        db.close();

    }

    return;
}
