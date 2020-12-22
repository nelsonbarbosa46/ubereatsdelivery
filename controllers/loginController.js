const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = (req, res, next) => {
    
    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;

    var errFields = false;

    //check if fields are empty
    if (email === '' || password === '') {
        errFields = true;
    }

    var sql = `SELECT email, password, typeUser FROM user WHERE email = ?`;

    //if dont have errors, continue and going to insert on db
    if (!errFields) {
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
                            email: email
                        }, 
                        process.env.PRIVATE_KEY, 
                        {
                            algorithm:'HS256',
                            expiresIn:'1d'
                        })

                        let response = {
                            message: "success",
                            login: {
                                email: email,
                                typeUser: typeUser,
                                token: token
                            },
                            request: {
                                type: 'POST',
                                description: 'Iniciar Sessão'
                            }
                        }
                        
                        res.status(200).send(response);
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
        })

        db.close();

    } else {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Iniciar Sessão'
            }
        }
        res.status(400).send(response);
    }

    return;
}

exports.checkTokenRequired = (req, res, next) => {


    var db = require('../sql').db();

    var token = req.body.token;

    try{
        const decode = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decode);
        next();
    }catch(err){
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Iniciar Sessão'
            }
        }
        return res.status(401).send(response)
    }


    db.close();

    return;
}

exports.checkTokenOptional = (req, res, next) => {

    var db = require('../sql').db();

    var token = req.body.token;

    try{
        const decode = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decode);
        next();
    }catch(err){
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Iniciar Sessão'
            }
        }
        next();
    }

    db.close();

}