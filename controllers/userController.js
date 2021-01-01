
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

exports.getInfoUser = (req, res, next) => {
    
    var id = req.params.id;
    //check if its not empty
    if (id) {  
        var db = require('../sql').db();
        var sql = `SELECT * FROM user WHERE id = ?`; 

        db.get(sql, [id], function (err, row) {
           if (err) {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação do Utilizador'
                    }
                }
                //error getting from table user
                res.status(500).json(response)
           } else {
                var name = row.name;
                var address = row.address;
                var zipCode = row.zipCode;
                var location = row.location;
                sql = `SELECT nif, contactNumber FROM client WHERE idUser = ?`;
                db.get(sql, [id], function (err, row) {
                    if (err) {
                        let response = {
                            message: "failed",
                            request: {
                                type: 'GET',
                                description: 'Obter Informação do Utilizador'
                            }
                        }
                        //error getting from table client
                        res.status(500).json(response)
                    } else {
                        let response = {
                            message: "success",
                            user: {
                                id: id,
                                name: name,
                                address: address,
                                zipCode: zipCode,
                                location: location,
                                nif: row.nif,
                                contactNumber: row.contactNumber
                            },
                            request: {
                                type: 'GET',
                                description: 'Obter Informação do Utilizador'
                            }
                        }
                        //success getting info
                        res.status(200).json(response)
                    }
                });
           }
        });


        db.close();
    } else {
        let response = {
            message: "failed",
            request: {
                type: 'GET',
                description: 'Obter Informação do Utilizador'
            }
        }
        //id is empty
        res.status(400).json(response)
    }
    
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

exports.changeInfo = (req, res, next) => {
    
    var arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];
    
    var id = req.params.id;
    var name = req.body.name;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var nif = req.body.nif;
    var contactNumber = req.body.contactNumber;

    //checking if any field is empty
    if (!id || !name || !address || !zipCode || !location || !nif || !contactNumber) {
        let response = {
            message: "failed",
            request: {
                type: 'PUT',
                description: 'Alterar Informações do Utilizador'
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
                description: 'Alterar Informações do Utilizador'
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
                description: 'Alterar Informações do Utilizador'
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
                description: 'Alterar Informações do Utilizador'
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
                description: 'Alterar Informações do Utilizador'
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
                        description: 'Alterar Informações do Utilizador'
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
                                description: 'Alterar Informações do Utilizador'
                            }
                        }
                        //error updating on table client
                        res.status(500).json(response)
                    } else {
                        let response = {
                            message: "success",
                            request: {
                                type: 'PUT',
                                description: 'Alterar Informações do Utilizador'
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
