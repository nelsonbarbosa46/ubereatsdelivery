
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

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

exports.changeInfoCl = (req, res, next) => {
        
    var id = req.params.id;
    var name = req.body.name;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var nif = req.body.nif;
    var contactNumber = req.body.contactNumber;

    //get token and decoded
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is incorrect
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //typeUser incorrect
        res.status(401).json(response);
    //checking if any field is empty
    } else if (!id || !name || !address || !zipCode || !location || !nif || !contactNumber) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //some field is empty
        res.status(400).json(response)
    //check if zipCode is invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //zipCode is invalid
        res.status(400).json(response)
    //check if location is invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //location is invalid
        res.status(400).json(response)
    //check if nif is invalid
    } else if (!nif.match('[2,3,5]{1}[0-9]{8}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //nif is invalid
        res.status(400).json(response)
    //check if contactNumber is invalid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Cliente/Condutor'
            }
        }
        //contactNumber is invalid
        res.status(400).json(response)
    } else {
        var db = require('../sql').db();
        var sql = `UPDATE user SET name=?, address=?, zipCode=?, location=? WHERE id = ?`;
        
        db.run(sql, [name, address, zipCode, location, id], function (err) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar Informações do Cliente/Condutor'
                    }
                }
                //error updating on table user
                res.status(500).json(response)
            } else {
                sql = `UPDATE client SET nif=?, contactNumber=? WHERE id=?`;
                db.run(sql, [nif, contactNumber, id], function (err) {
                    if (err) {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'PUT',
                                description: 'Alterar Informações do Cliente/Condutor'
                            }
                        }
                        //error updating on table client
                        res.status(500).json(response)
                    } else {
                        let response = {
                            message: "success",
                            request: {
                                type: 'PUT',
                                description: 'Alterar Informações do Cliente/Condutor'
                            }
                        }
                        //update successfuly
                        res.status(200).json(response)
                    }
                });
            }
        });

        db.close();
    }
    
    return;
}

exports.changeInfoMe = (req, res, next) => {

    var id = req.params.id;
    var name = req.body.name;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var nipc = req.body.nipc;
    var contactNumber = req.body.contactNumber;
    var description = req.body.description;
    var category = req.body.category;

    //get token and decoded
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is incorrect
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //typeUser incorrect
        res.status(401).json(response);
    //check if any field is empty
    } else if (
        !name || !address || !zipCode || !location || !nipc || !contactNumber || !description || !category) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //some field is empty
        res.status(400).json(response);
    //check if zipCode is invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //zipCode is invalid
        res.status(400).json(response);
    //check if location is invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //location is invalid
        res.status(400).json(response)
    //check if nipc is invalid
    } else if (!nipc.match('[2,3,5]{1}[0-9]{8}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //nipc is invalid
        res.status(400).json(response)
    //check if contactNumber is invalid
    } else if (!contactNumber.match('[2,3,9]{1}[0-9]{8}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //contactNumber is invalid
        res.status(400).json(response)
    //check if category is invalid
    } else if (category < 1 || category > 5) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações da Empresa'
            }
        }
        //category is invalid
        res.status(400).json(response)
    } else {
        var db = require("../sql").db();

        var sql = `UPDATE user SET name=?, address=?, zipCode=?, location=? WHERE id=?`;

        db.run(sql, [name, address, zipCode, location, id], 
            function (err) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'PUT',
                            description: 'Alterar Informações da Empresa'
                        }
                    }
                    //error updating on table user
                    res.status(500).json(response)
                } else {
                    sql = `UPDATE merchant SET category=?, nipc=?, description=?, contactNumber=? WHERE idUser=?`;
                    db.run(sql, [category, nipc, description, contactNumber, id], 
                        function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar Informações da Empresa'
                                    }
                                }
                                //error updating on table merchant
                                res.status(500).json(response)
                            } else {
                                let response = {
                                    message: "success",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar Informações da Empresa'
                                    }
                                }
                                //update successful
                                res.status(200).json(response)
                            }
                        }
                    )
                }
            }
        )

        db.close();
    }

    return;
}

exports.changeLogoMe = (req, res, next) => {

    var id = req.params.id;
    var logo = req.file;
    const fs = require('fs');

    //get token and decoded
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is invalid
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Logótipo da Empresa'
            }
        }
        //some field is empty
        res.status(401).json(response);
    //check if any field is empty
    } else if (!id || !logo) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Logótipo da Empresa'
            }
        }
        //some field is empty
        res.status(400).json(response);
    } else {
        var logoPath = req.file.path;
        var db = require("../sql").db();

        var sql = `SELECT logo FROM merchant WHERE idUser = ?`;

        //get old image url
        db.get(sql, [id], 
            function (err, row) {
                if (err) {
                    //delete new image because was error on update
                    fs.unlink(logoPath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    let response = {
                        message: "failed",
                        request: {
                            type: 'PUT',
                            description: 'Alterar Logótipo da Empresa'
                        }
                    }
                    //error getting image url
                    res.status(500).json(response);
                } else {
                    var oldLogoPath = row.logo;
                    sql = `UPDATE merchant SET logo=? WHERE idUser = ?`;
                    db.run(sql, [logoPath, id], 
                        function (err) {
                            if (err) {
                                //delete new image because was error on update
                                fs.unlink(logoPath, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar Logótipo da Empresa'
                                    }
                                }
                                //error updating on merchant
                                res.status(500).json(response);
                            } else {
                                //delete old image
                                fs.unlink(oldLogoPath, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                                let response = {
                                    message: "success",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar Logótipo da Empresa'
                                    }
                                }
                                //update successful
                                res.status(200).json(response);
                            }
                        }
                    )
                }
            }
        )

        db.close();
    }

    return;
}

exports.changeInfoAd = (req, res, next) => {
    
    var id = req.params.id;
    var name = req.body.name;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;

    //get token and decoded
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is incorrect
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Administrador'
            }
        }
        //typeUser incorrect
        res.status(401).json(response);
    //checking if any field is empty
    } else if (!id || !name || !address || !zipCode || !location) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Administrador'
            }
        }
        //some field is empty
        res.status(400).json(response)
    //check if zipCode is invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Administrador'
            }
        }
        //zipCode is invalid
        res.status(400).json(response)
    //check if location is invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Administrador'
            }
        }
        //location is invalid
        res.status(400).json(response)
    } else {
        var db = require('../sql').db();
        var sql = `UPDATE user SET name=?, address=?, zipCode=?, location=? WHERE id = ?`;
        
        db.run(sql, [name, address, zipCode, location.toLowerCase(), id], function (err) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Alterar Informações do Administrador'
                    }
                }
                //error updating on table user
                res.status(500).json(response)
            } else {
                let response = {
                    message: "success",
                    request: {
                        type: 'PUT',
                        description: 'Alterar Informações do Administrador'
                    }
                }
                //update successfuly
                res.status(200).json(response)
            }
        });

        db.close();
    }
    
    return;
}

exports.getInfoUserCl = (req, res, next) => {
    
    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    //check it typeUser is incorrect
    if (decoded.typeUser != 0 && decoded.typeUser != 1) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação do Cliente/Condutor'
            }
        }
        //typeUser is incorrect
        res.status(401).json(response)
    //check if its empty
    } else if (!id) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação do Cliente/Condutor'
            }
        }
        //id is empty
        res.status(400).json(response)
    } else {
        var db = require('../sql').db();
        var sql = `SELECT user.name, user.address, user.zipCode, user.location, client.nif, client.contactNumber 
        FROM user INNER JOIN client ON user.id = client.idUser WHERE user.id = ?`; 

        db.get(sql, [id], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'GET',
                            description: 'Obter Informações do Cliente/Condutor'
                        }
                    }
                    //error getting info
                    res.status(500).json(response)
                } else {
                    let response = {
                        message: "success",
                        user: {
                            id: id,
                            name: row.name,
                            address: row.address,
                            zipCode: row.zipCode,
                            location: row.location,
                            nif: row.nif,
                            contactNumber: row.contactNumber 
                        },
                        "request": {
                            type: 'GET',
                            description: 'Obter Informações do Cliente/Condutor'
                        }
                    }
                    //select successful
                    res.status(200).json(response)
                }
            }
        )

        db.close();
    }
    
    return;
}

exports.getInfoUserMe = (req, res, next) => {

    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    //check it typeUser is incorrect
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação da Empresa'
            }
        }
        //typeUser is incorrect
        res.status(401).json(response)
    //check if its empty
    } else if (!id) { 
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informações da Empresa'
            }
        }
        //empty field
        res.status(400).json(response)
    } else {
        var db = require("../sql").db();
        var sql = `SELECT user.name, user.address, user.zipCode, user.location, merchant.category, merchant.nipc,
        merchant.description, merchant.contactNumber FROM user
        INNER JOIN merchant ON user.id = merchant.idUser WHERE user.id = ?`;

        db.get(sql, [id], 
            function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'GET',
                            description: 'Obter Informações da Empresa'
                        }
                    }
                    //error getting info
                    res.status(500).json(response)
                } else {
                    let response = {
                        message: "success",
                        user: {
                            id: id,
                            name: row.name,
                            address: row.address,
                            zipCode: row.zipCode,
                            location: row.location,
                            category: row.category,
                            nipc: row.nipc,
                            description: row.description,
                            contactNumber: row.contactNumber 
                        },
                        "request": {
                            type: 'GET',
                            description: 'Obter Informações da Empresa'
                        }
                    }
                    //select successful
                    res.status(200).json(response)
                }
            }
        )
        db.close();
    }


    return;
}

exports.getInfoUserAd = (req, res, next) => {
    
    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    //check it typeUser is incorrect
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação do Administrador'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //check if its empty
    } else if (!id) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação do Administrador'
            }
        }
        //id is empty
        res.status(400).json(response)
    } else {
        var db = require('../sql').db();
        var sql = `SELECT name, address, zipCode, location FROM user WHERE id = ?`; 

        db.get(sql, [id], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'GET',
                            description: 'Obter Informações do Administrador'
                        }
                    }
                    //error getting info
                    res.status(500).json(response)
                } else {
                    let response = {
                        message: "success",
                        user: {
                            id: id,
                            name: row.name,
                            address: row.address,
                            zipCode: row.zipCode,
                            location: row.location
                        },
                        "request": {
                            type: 'GET',
                            description: 'Obter Informações do Administrador'
                        }
                    }
                    //select successful
                    res.status(200).json(response)
                }
            }
        )

        db.close();
    }
    
    return;
}

exports.delUserCl = (req, res, next) => {

    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //in the future, need to change this code because of the future dependences (deliverys, etc.)

    if (decoded.typeUser != 0 && decoded.typeUser != 1) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Cliente/Condutor'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //id is empty
    } else if (!id) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Cliente/Condutor'
            }
        }
        //id is empty
        res.status(400).json(response)
    } else {
        var db = require("../sql").db();
        var sql = `SELECT id, isDriver FROM client WHERE idUser = ?`;
        
        db.get(sql, [id], 
            function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'DELETE',
                            description: 'Eliminar Conta Cliente/Condutor'
                        }
                    }
                    //error selecting
                    res.status(500).json(response)
                } else {
                    if (row.isDriver == 0) {
                        sql = `DELETE FROM client WHERE idUser = ?`;
                        db.run(sql, [id], function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'DELETE',
                                        description: 'Eliminar Conta Cliente/Condutor'
                                    }
                                }
                                //error deleting on table client
                                res.status(500).json(response)     
                            } else {
                                sql = `DELETE FROM user WHERE id = ?`;
                                db.run(sql, [id], function (err) {
                                    if (err) {
                                        let response = {
                                            message: "failed",
                                            request: {
                                                type: 'DELETE',
                                                description: 'Eliminar Conta Cliente/Condutor'
                                            }
                                        }
                                        //error deleting on table user
                                        res.status(500).json(response) 
                                    } else {
                                        //delete successful
                                        res.status(204).json()
                                    }
                                })   
                            }
                        })
                    //not driver
                    } else {
                        var idClient = row.id;
                        sql = `DELETE FROM driver WHERE idClient = ?`;
                        db.run(sql, [idClient], function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'DELETE',
                                        description: 'Eliminar Conta Cliente/Condutor'
                                    }
                                }
                                //error deleting on table driver
                                res.status(500).json(response)
                            } else {
                                sql = `DELETE FROM client WHERE id = ?`;
                                db.run(sql, [idClient], function (err) {
                                        if (err) {
                                            let response = {
                                                message: "failed",
                                                request: {
                                                    type: 'DELETE',
                                                    description: 'Eliminar Conta Cliente/Condutor'
                                                }
                                            }
                                            //error deleting on table client
                                            res.status(500).json(response)
                                        } else {
                                            sql = `DELETE FROM user WHERE id = ?`;
                                            db.run(sql, [id], function (err) {
                                                    if (err) {
                                                        let response = {
                                                            message: "failed",
                                                            request: {
                                                                type: 'DELETE',
                                                                description: 'Eliminar Conta Cliente/Condutor'
                                                            }
                                                        }
                                                        //error deleting on table user
                                                        res.status(500).json(response)
                                                    } else {
                                                        //delete successful
                                                        res.status(204).json()
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        })
                    }
                }
            }     
        )

        db.close();
    }

    return;
}

exports.delUserMe = (req, res, next) => {

    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //in the future, need to change this code because of the future dependences (deliverys, etc.)

    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Empresa'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //id is empty
    } else if (!id) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Empresa'
            }
        }
        //id is empty
        res.status(400).json(response)
    } else {
        var db = require("../sql").db();
        var sql = `DELETE FROM merchant WHERE idUser = ?`;
        
        db.run(sql, [id], function (err) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'DELETE',
                        description: 'Eliminar Conta Empresa'
                    }
                }
                //error deleting on table merchant
                res.status(500).json(response)
            } else {
                sql = `DELETE FROM user WHERE id = ?`;
                db.run(sql, [id], function (err) {
                    if (err) {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'DELETE',
                                description: 'Eliminar Conta Empresa'
                            }
                        }
                        //error deleting on table user
                        res.status(500).json(response)    
                    } else {
                        //delete successful
                        res.status(204).json(response)
                    }
                });
            }
        });
        db.close();   
    }

    return;
}

exports.delUserAd = (req, res, next) => {

    var id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //in the future, need to change this code because of the future dependences

    if (decoded.typeUser != 3) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Administrador'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //id is empty
    } else if (!id) {
        let response = {
            message: "failed",
            request: {
                type: 'DELETE',
                description: 'Eliminar Conta Administrador'
            }
        }
        //id is empty
        res.status(400).json(response)
    } else {
        var db = require("../sql").db();
        var sql = `DELETE FROM admin WHERE idUser = ?`;
        
        db.run(sql, [id], function (err) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'DELETE',
                        description: 'Eliminar Conta Administrador'
                    }
                }
                //error deleting on table merchant
                res.status(500).json(response)
            } else {
                sql = `DELETE FROM user WHERE id = ?`;
                db.run(sql, [id], function (err) {
                    if (err) {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'DELETE',
                                description: 'Eliminar Conta Administrador'
                            }
                        }
                        //error deleting on table user
                        res.status(500).json(response)    
                    } else {
                        //delete successful
                        res.status(204).json()
                    }
                });
            }
        });
        db.close();   
    }

    return;
}

exports.getDriversUnchecked = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check token to see if the user type is the same as the admin type
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Condutores com estado pendente'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    } else {
        var sql = `SELECT user.id, user.email, user.name, user.address, user.zipCode, user.location,
        client.nif, client.contactNumber, client.id AS 'idClient', driver.id AS 'idDriver', driver.typeVehicle FROM ((user
        INNER JOIN client ON user.id = client.idUser)
        INNER JOIN driver ON client.id = driver.idClient) WHERE driver.isChecked = ?`;


        function getUsersSQL() {
            return new Promise ((resolve, reject) => {
                var db = require("../sql").db();
                var query = [];

                db.each(sql, [0], function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        query.push(
                            {
                                idUser: row.id,
                                email: row.email,
                                name: row.name,
                                address: row.address,
                                zipCode: row.zipCode,
                                location: row.location,
                                nif: row.nif,
                                contactNumber: row.contactNumber,
                                idClient: row.idClient,
                                idDriver: row.idDriver,
                                typeVehicle: row.typeVehicle
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

        getUsersSQL().then(function (data) {
            let response = {
                message: "success",
                listUsers: data,
                request: {
                    type: 'GET',
                    description: 'Obter Condutores com estado pendente'
                }
            };
            res.status(200).json(response);
        //got a error 
        }).catch(function (data) {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Condutores com estado pendente'
                }
            }
            errSQL = true;
            //error selecting
            res.status(500).json(response)
        });

    }
    
    return;
}

exports.getMerchantsUnchecked = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check token to see if the user type is the same as the admin type
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Empresas com estado pendente'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    } else {
        var sql = `SELECT user.id, user.email, user.name, user.address, user.zipCode, user.location,
        merchant.id AS 'idMerchant', merchant.description, merchant.nipc, merchant.contactNumber FROM user
        INNER JOIN merchant ON user.id = merchant.idUser WHERE merchant.isChecked = ?`;


        function getUsersSQL() {
            return new Promise ((resolve, reject) => {
                var db = require("../sql").db();
                var query = [];

                db.each(sql, [0], function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        query.push(
                            {
                                idUser: row.id,
                                email: row.email,
                                name: row.name,
                                address: row.address,
                                zipCode: row.zipCode,
                                location: row.location,
                                idMerchant: row.idMerchant,
                                description: row.description,
                                nipc: row.nipc,
                                contactNumber: row.contactNumber
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

        getUsersSQL().then(function (data) {
            let response = {
                message: "success",
                listUsers: data,
                request: {
                    type: 'GET',
                    description: 'Obter Empresas com estado pendente'
                }
            };
            res.status(200).json(response);
        //got a error 
        }).catch(function (data) {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Empresas com estado pendente'
                }
            }
            errSQL = true;
            //error selecting
            res.status(500).json(response)
        });

    }
    
    return;
}

exports.checkDriver = (req, res, next) => {
    
    const idDriver = req.params.id;
    const canWork = req.body.canWork;
    const reasonCanWork = req.body.reasonCanWork;

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    

    //check token to see if the user type is the same as the admin type
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido do condutor'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //check if its empty
    } else if (!idDriver) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido do condutor'
            }
        }
        //id is empty
        res.status(400).json(response)
    //check if canWork is invalid
    } else if (canWork != 0 && canWork != 1) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido do condutor'
            }
        }
        //canWork is invalid
        res.status(400).json(response);
    } else {
        const db = require("../sql").db();
        var sql = `SELECT isChecked FROM driver WHERE id = ?`;

        db.get(sql, [idDriver], function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Responder pedido do condutor'
                    }
                }
                //error getting isChecked
                res.status(500).json(response);
            } else {
                if (row.isChecked == 1) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'PUT',
                            description: 'Responder pedido do condutor'
                        }
                    }
                    //error because is already checked
                    res.status(403).json(response);
                } else {
                    sql = `UPDATE driver SET canWork = ?, isChecked = ?, reasonCanWork = ? WHERE id = ?`;
                    db.run(sql, [canWork, 1, reasonCanWork, idDriver], function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                request: {
                                    type: 'PUT',
                                    description: 'Responder pedido do condutor'
                                }
                            }
                            //error updating
                            res.status(500).json(response);
                        } else {
                            let response = {
                                message: "success",
                                driver: {
                                    canWork: canWork,
                                    reasonCanWork: reasonCanWork
                                },
                                request: {
                                    type: 'PUT',
                                    description: 'Responder pedido do condutor'
                                }
                            }
                            //update successful
                            res.status(200).json(response);
                        }
                    });
                }
            }
        });

        db.close();

    }
    
    return;
}

exports.checkMerchant = (req, res, next) => {
    
    const idMerchant = req.params.id;
    const canWork = req.body.canWork;
    const reasonCanWork = req.body.reasonCanWork;

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    

    //check token to see if the user type is the same as the admin type
    if (decoded.typeUser != 3 && decoded.typeUser != 4) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido da empresa'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    //check if its empty
    } else if (!idMerchant) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido da empresa'
            }
        }
        //id is empty
        res.status(400).json(response)
    //check if canWork is invalid
    } else if (canWork != 0 && canWork != 1) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Responder pedido da empresa'
            }
        }
        //canWork is invalid
        res.status(400).json(response);
    } else {
        const db = require("../sql").db();
        var sql = `SELECT isChecked FROM merchant WHERE id = ?`;

        db.get(sql, [idMerchant], function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'PUT',
                        description: 'Responder pedido da empresa'
                    }
                }
                //error getting isChecked
                res.status(500).json(response);
            } else {
                if (row.isChecked == 1) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'PUT',
                            description: 'Responder pedido da empresa'
                        }
                    }
                    //error because is already checked
                    res.status(403).json(response);
                } else {
                    sql = `UPDATE merchant SET canWork = ?, isChecked = ?, reasonCanWork = ? WHERE id = ?`;
                    db.run(sql, [canWork, 1, reasonCanWork, idMerchant], function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                request: {
                                    type: 'PUT',
                                    description: 'Responder pedido da empresa'
                                }
                            }
                            //error updating
                            res.status(500).json(response);
                        } else {
                            let response = {
                                message: "success",
                                driver: {
                                    canWork: canWork,
                                    reasonCanWork: reasonCanWork
                                },
                                request: {
                                    type: 'PUT',
                                    description: 'Responder pedido da empresa'
                                }
                            }
                            //update successful
                            res.status(200).json(response);
                        }
                    });
                }
            }
        });

        db.close();

    }
    
    return;
}