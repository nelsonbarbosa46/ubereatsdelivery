const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//function when login is success, get url to redirect
function getRedirectURL(typeUser) {
    var url;

    switch (typeUser) {
        //client
        case 0:
            url = "/client/";
            break;
        
        //driver
        case 1:
            url = "/client/";
            break;

        //merchant
        case 2:
            url = "/merchant/";
            break;

        //admin
        case 3:
            url = "/admin/";
            break;

        //superadmin
        case 4:
            url = "/admin/";
            break;

        default:
            break;
    }
    
    return url;
}

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
                res.status(500).json(response);
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

                        //get url to redirect
                        var url = getRedirectURL(typeUser);

                        let response = {
                            message: "success",
                            login: {
                                email: email,
                                typeUser: typeUser,
                                token: token,
                                url: url
                            },
                            request: {
                                type: 'POST',
                                description: 'Iniciar Sessão'
                            }
                        }
                        
                        res.status(200).json(response);
                    } else {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'POST',
                                description: 'Iniciar Sessão'
                            }
                        }
                        res.status(500).json(response);
                    }
                } else {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Iniciar Sessão'
                        }
                    }
                    res.status(500).json(response);
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
        res.status(400).json(response);
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
        return res.status(401).json(response)
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