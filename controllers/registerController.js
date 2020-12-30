
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

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.createAdmin = async (req, res, next) => {

    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var name = req.body.name;

    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    var typeUser = 3;

    var errFields = false;

    //check email if its valid
    errFields = !validateEmail(email);

    //check if fields are empty
    if (email === '' || password === '' || repeatPassword === '' || address === '' || 
    zipCode === '' || location === '' || name === '') {
        errFields = true;
    }

    //check if password is equal to repeatPassword
    if (password !== repeatPassword) {
        errFields = true;
    }

    //check password if has one uppercase, one lowercase, one number and at least 8 characters
    if (password.match(/[a-z]/g) === null || 
    password.match( /[A-Z]/g) === null || 
    null === password.match( /[0-9]/g) || password.length < 8
    ) 
    {
        errFields = true;
    };

    if (!errFields) {
        //create hash
        const hash = await bcrypt.hashSync(password, 10);

        let sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location , typeUser],
            function (err) {
                if (!err) {
                    let id = this.lastID;
                    sql = `INSERT INTO admin(idUser) VALUES (?)`;
                    db.run(sql, [id], 
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
                                res.status(500).json(response);
                            } else {

                                //create token
                                var token = jwt.sign({
                                    typeUser: typeUser,
                                    email: email,
                                    name: name,
                                    id: id
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
                                    userCreated: {
                                        email: email,
                                        name: name
                                    },
                                    login: {
                                        token: token,
                                        url: url
                                    },
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um administrador'
                                    }
                                }

                                //status 201 because was inserted in both of the tables
                                res.status(201).json(response);
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
                    res.status(500).json(response);
                }
            }   
        )

        //close connection
        db.close();

    } else {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        }
        //error because the fields are empty/has a error
        res.status(400).json(response);        
    }

    return;
}

exports.createClientDriver = async (req, res, next) => {

    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
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

    var errFields = false;

    
    //check if fields are empty
    if (email === '' || password === '' || repeatPassword === '' || address === '' || 
    zipCode === '' || location === '' || name === '' || nif === '' || contactNumber === ''
    || isDriver === '') {
        errFields = true;
    }

    //check if password is equal repeatPassword
    if (password !== repeatPassword) {
        errFields = true;
    }

    function checkIfWantsBeDriver(isDriver, idClient, typeVehicle, canWork, isChecked, name, typeUser, idUser) {
        if (isDriver == 1) {
            sql = `INSERT INTO driver(idClient, typeVehicle, canWork, isChecked) VALUES (?,?,?,?)`;
            db.run(sql, [idClient, typeVehicle, canWork, isChecked], 
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

                        //create token
                        var token = jwt.sign({
                            typeUser: typeUser,
                            email: email,
                            name: name,
                            id: idUser
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
                            userCreated: {
                                email: email,
                                name: name
                            },
                            login: {
                                token: token,
                                url: url
                            },
                            request: {
                                type: 'POST',
                                description: 'Criar um cliente/condutor'
                            }
                        }
                        //status 201 because was inserted in both of the tables (driver)
                        res.status(201).json(response)
                    }
                }
            ) 
        } else {
            //create token
            var token = jwt.sign({
                typeUser: typeUser,
                email: email,
                name: name,
                id: idUser
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
                userCreated: {
                    email: email,
                    name: name
                },
                login: {
                    token: token,
                    url: url
                },
                request: {
                    type: 'POST',
                    description: 'Criar um cliente/condutor'
                }
            }
            //status 201 because was inserted in both of the tables (client)
            res.status(201).json(response)
        }
    }

    const hash = await bcrypt.hashSync(password, 10);

    //check email if its valid
    errFields = !validateEmail(email);

    //check if value is right on isDriver; 
    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    if (isDriver == 1) {
        typeUser = 1;
        //check if its undefined
        if (typeof typeVehicle === 'undefined') {
            errFields = true;
        } else {
            //check if value typeVehicle is correct
            if (typeVehicle < 0 || typeVehicle > 3) {
                errFields = true;
            }
        }
    } else {
        typeUser = 0;
    }    

    var sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    //if dont have errors, continue and going to insert on db
    if (!errFields) {
        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location, typeUser],
            function (err) {
                if (!err) {
                    let idUser = this.lastID;
                    sql = `INSERT INTO client(idUser, nif, contactNumber, isDriver)
                    VALUES (?, ?, ?, ?)`;
                    db.run(sql, [idUser, nif, contactNumber, isDriver],
                        function (err) {
                            if (!err) {
                                let id = this.lastID;
                                //function to check if client want to be a driver
                                checkIfWantsBeDriver(isDriver, id, typeVehicle, canWork, isChecked, name, typeUser, idUser);
                            } else {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um cliente/condutor'
                                    }
                                };
                                //error inserting on table client
                                res.status(500).json(response)
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
                    res.status(500).json(response)
                }
            }
            
        )

        db.close();

    } else {
        //error inserting on table user
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        res.status(400).json(response)
    }

    
    return;
    
}

exports.createMerchant = async (req, res, next) => {
    
    var db = require('../sql').db();

    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var name = req.body.name;
    var category = req.body.category;
    var nipc = req.body.nipc;
    var description = req.body.description;
    var logo = req.file;
    var contactNumber = req.body.contactNumber;
    //typeUser Client=0, Driver=1, Merchant=2, Admin=3
    var typeUser = 2;
    //default on canWork and isChecked when is created
    var canWork = 0;
    var isChecked = 0;
    var logoPath;

    var errFields = false;

    //check email if its valid
    errFields = !validateEmail(email);

    //check if upload has a error
    if (!logo) {
        errFields = true;
    } else {
        logoPath = req.file.path;
    }

    //check if its equal
    if (password !== repeatPassword) {
        errFields = true;
    }
    
    //check if fields are empty
    if (email === '' || password === '' || repeatPassword === '' || address === '' || 
    zipCode === '' || location === '' || name === '' || category === '' || nipc === '' ||
    description === '' || contactNumber === '') {
       
        errFields = true;
    }

    //check password if has one uppercase, one lowercase, one number and at least 8 characters
    if (password.match(/[a-z]/g) === null || 
    password.match( /[A-Z]/g) === null || 
    null === password.match( /[0-9]/g) || password.length < 8
    ) 
    {
        errFields = true;
    }

    //if doesnt have any errors on fields, program continues
    if (!errFields) {
        const hash = await bcrypt.hashSync(password, 10);
        
        let sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location, typeUser],
            function (err) {
                if (!err) {
                    var id = this.lastID;
                    sql = `INSERT INTO merchant(idUser, category, nipc, description, logo, contactNumber, canWork, isChecked)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    db.run(sql, [id, category, nipc, description, logoPath, contactNumber, canWork, isChecked],
                        function (err) {
                            if (err) {
                                //error inserting on table merchant
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma empresa'
                                    }
                                }
                                res.status(500).json(response)
                            } else {

                                //create token
                                var token = jwt.sign({
                                    typeUser: typeUser,
                                    email: email,
                                    name: name,
                                    id: id
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
                                    userCreated: {
                                        email: email,
                                        name: name
                                    },
                                    login: {
                                        token: token,
                                        url: url
                                    },
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma empresa'
                                    }
                                }
                                //status 201 because was inserted in both of the tables
                                res.status(201).json(response)
                            }
                        }    
                    )
                } else {
                    //error inserting on table user
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar uma empresa'
                        }
                    }
                    res.status(500).json(response)
                }
            }    
        )
    } else {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        res.status(400).json(response)
    }

    db.close();

    return;
}