const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../sql');
=======
>>>>>>> Stashed changes

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
                        console.log(process.env.JWT_KEY)
                        var typeUser = row.typeUser;

                        var token = jwt.sign({
                            typeUser: typeUser,
                            email: email,
                            password: password
                        }, 
                        process.env.PRIVATE_KEY, 
                        {
                            algorithm:'HS256',
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
        }
    )

    db.close();

    return;
}

<<<<<<< Updated upstream
exports.checkToken = (req, res, next) => {
=======
exports.checkTokenRequired = (req, res, next) => {
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
}