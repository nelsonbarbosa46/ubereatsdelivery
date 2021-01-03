
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const arrCountiesLowerCase = ["águeda","albergaria-a-velha","anadia","arouca","aveiro","castelo de paiva","espinho","estarreja","santa maria da feira","ílhavo","mealhada","murtosa","oliveira de azeméis","oliveira do bairro","ovar","são joão da madeira","sever do vouga","vagos","vale de cambra","aljustrel","almodôvar","alvito","barrancos","beja","castro verde","cuba","ferreira do alentejo","mértola","moura","odemira","ourique","serpa","vidigueira","amares","barcelos","braga","cabeceiras de basto","celorico de basto","esposende","fafe","guimarães","póvoa de lanhoso","terras de bouro","vieira do minho","vila nova de famalicão","vila verde","vizela","alfândega da fé","bragança","carrazeda de ansiães","freixo de espada à cinta","macedo de cavaleiros","miranda do douro","mirandela","mogadouro","torre de moncorvo","vila flor","vimioso","vinhais","belmonte","castelo branco","covilhã","fundão","idanha-a-nova","oleiros","penamacor","proença-a-nova","sertã","vila de rei","vila velha de ródão","arganil","cantanhede","coimbra","condeixa-a-nova","figueira da foz","góis","lousã","mira","miranda do corvo","montemor-o-velho","oliveira do hospital","pampilhosa da serra","penacova","penela","soure","tábua","vila nova de poiares","alandroal","arraiolos","borba","estremoz","évora","montemor-o-novo","mora","mourão","portel","redondo","reguengos de monsaraz","vendas novas","viana do alentejo","vila viçosa","albufeira","alcoutim","aljezur","castro marim","faro","lagoa (algarve)","lagos","loulé","monchique","olhão","portimão","são brás de alportel","silves","tavira","vila do bispo","vila real de santo antónio","aguiar da beira","almeida","celorico da beira","figueira de castelo rodrigo","fornos de algodres","gouveia","guarda","manteigas","mêda","pinhel","sabugal","seia","trancoso","vila nova de foz côa","alcobaça","alvaiázere","ansião","batalha","bombarral","caldas da rainha","castanheira de pêra","figueiró dos vinhos","leiria","marinha grande","nazaré","óbidos","pedrógão grande","peniche","pombal","porto de mós","alenquer","arruda dos vinhos","azambuja","cadaval","cascais","lisboa","loures","lourinhã","mafra","oeiras","sintra","sobral de monte agraço","torres vedras","vila franca de xira","amadora","odivelas","alter do chão","arronches","avis","campo maior","castelo de vide","crato","elvas","fronteira","gavião","marvão","monforte","nisa","ponte de sor","portalegre","sousel","amarante","baião","felgueiras","gondomar","lousada","maia","marco de canaveses","matosinhos","paços de ferreira","paredes","penafiel","porto","póvoa de varzim","santo tirso","valongo","vila do conde","vila nova de gaia","trofa","abrantes","alcanena","almeirim","alpiarça","benavente","cartaxo","chamusca","constância","coruche","entroncamento","ferreira do zêzere","golegã","mação","rio maior","salvaterra de magos","santarém","sardoal","tomar","torres novas","vila nova da barquinha","ourém","alcácer do sal","alcochete","almada","barreiro","grândola","moita","montijo","palmela","santiago do cacém","seixal","sesimbra","setúbal","sines","arcos de valdevez","caminha","melgaço","monção","paredes de coura","ponte da barca","ponte de lima","valença","viana do castelo","vila nova de cerveira","alijó","boticas","chaves","mesão frio","mondim de basto","montalegre","murça","peso da régua","ribeira de pena","sabrosa","santa marta de penaguião","valpaços","vila pouca de aguiar","vila real","armamar","carregal do sal","castro daire","cinfães","lamego","mangualde","moimenta da beira","mortágua","nelas","oliveira de frades","penalva do castelo","penedono","resende","santa comba dão","são joão da pesqueira","são pedro do sul","sátão","sernancelhe","tabuaço","tarouca","tondela","vila nova de paiva","viseu","vouzela","calheta (madeira)","câmara de lobos","funchal","machico","ponta do sol","porto moniz","ribeira brava","santa cruz","santana","são vicente","porto santo","vila do porto","lagoa (madeira)","nordeste","ponta delgada","povoação","ribeira grande","vila franca do campo","angra do heroísmo","vila da praia da vitória","santa cruz da graciosa","calheta (açores)","velas","lajes do pico","madalena","são roque do pico","horta","lajes das flores","santa cruz das flores","corvo"];

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

    var email = req.body.email;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    var address = req.body.address;
    var zipCode = req.body.zipCode;
    var location = req.body.location;
    var name = req.body.name;

    //typeUser Client=0, Driver=1, Merchant=2, Admin=3 
    var typeUser = 3;
    
    //check if any field are empty
    if (!email || !password || !repeatPassword || !address || !zipCode || !location || !name) {
        console.log("deu empty");
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //some field is empty
        res.status(400).json(response);
    //check if password is invalid
    } else if (!validateEmail(email)) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //email invalid
        res.status(400).json(response);
    //check if password is invalid
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15
    ) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //password invalid
        res.status(400).json(response);
    //check if password is not equal to repeatPassword
    } else if (password != repeatPassword) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //password not equal to repeatPassword
        res.status(400).json(response);
    //check if zipCode is invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //zipCode invalid
        res.status(400).json(response);
    //check if location is invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um administrador'
            }
        };
        //location invalid
        res.status(400).json(response);
    } else {
        var db = require('../sql').db();

        //create hash
        const hash = await bcrypt.hashSync(password, 10);

        var sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [email, hash, name, address, zipCode, location, typeUser], 
            function (err) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar um administrador'
                        }
                    }
                    //error inserting on table user
                    res.status(500).json(response);
                } else {
                    let id = this.lastID;
                    sql = `INSERT INTO admin(idUser) VALUES (?)`;
                    db.run(sql, [id], function (err) {
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
                    });
                }
            }
        );

        db.close();
    }

    return;
}

exports.createClientDriver = async (req, res, next) => {

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
    
    console.log(email, password, repeatPassword, address, zipCode, location, name, nif, contactNumber, isDriver);

    //check if any fields is empty
    if (!email || !password || !repeatPassword || !address || !zipCode ||
        !location || !name || !nif || !contactNumber) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //some field is empty
        res.status(400).json(response)
    //check if password is invalid
    } else if (!validateEmail(email)) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //email invalid
        res.status(400).json(response)
    //check if password is invalid
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15
    ) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //password invalid
        res.status(400).json(response)
    //check if password is not equal to repeatPassword
    } else if (password != repeatPassword) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //password not equal to repeatPassword
        res.status(400).json(response)
    //check if zipCode invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //zipCode invalid
        res.status(400).json(response)
    //check if location invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar um cliente/condutor'
            }
        };
        //location invalid
        res.status(400).json(response)
    } else if (isDriver == 1) {
        //typeUser Driver = 1
        typeUser = 1;
        //check if its empty
        if (!typeVehicle) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um cliente/condutor'
                }
            };
            //typeVehicle empty
            res.status(400).json(response)
        //check if tpyeVehicle is invalid
        } else if (typeVehicle < 1 || typeVehicle > 3) {
            let response = {
                message: "failed",
                request: {
                    type: 'POST',
                    description: 'Criar um cliente/condutor'
                }
            };
            res.status(400).json(response)
            //typeVehicle invalid
        } else {
            createDriver(email, password, name, address, zipCode, location, typeUser, nif, 
                contactNumber, isDriver, typeVehicle);
        }
    } else {
        //typeUser Client = 0
        typeUser = 0;
        createClient(email, password, name, address, zipCode, location, typeUser, nif, contactNumber, isDriver);
    }

    async function createClient(email, password, name, address, zipCode, location, typeUser, nif, contactNumber, isDriver) {
        
        var db = require('../sql').db();

        //create hash
        const hash = await bcrypt.hashSync(password, 10);

        var sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location, typeUser], 
            function (err) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar um cliente/condutor'
                        }
                    };
                    //error inserting on table user
                    res.status(500).json(response)
                } else {
                    let idUser = this.lastID;
                    sql = `INSERT INTO client(idUser, nif, contactNumber, isDriver)
                    VALUES (?, ?, ?, ?)`;
                    db.run(sql, [idUser, nif, contactNumber, isDriver], 
                        function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um cliente/condutor'
                                    }
                                };
                                //error inserting on table client
                                res.status(500).json(response)
                            } else {

                                //create token
                                var token = jwt.sign({
                                    typeUser: typeUser,
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
                                //status 201 because was inserted in both of the tables
                                res.status(201).json(response)
                            }
                        }
                    )
                }
            }
        )

        db.close();
    }

    async function createDriver(email, password, name, address, zipCode, location, typeUser, nif, 
        contactNumber, isDriver, typeVehicle) {
        
        var db = require('../sql').db();

        //create hash
        const hash = await bcrypt.hashSync(password, 10);

        var sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location, typeUser], 
            function (err) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar um cliente/condutor'
                        }
                    };
                    //error inserting on table user
                    res.status(500).json(response)
                } else {
                    let idUser = this.lastID;
                    sql = `INSERT INTO client(idUser, nif, contactNumber, isDriver)
                    VALUES (?, ?, ?, ?)`;
                    db.run(sql, [idUser, nif, contactNumber, isDriver], 
                        function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um cliente/condutor'
                                    }
                                };
                                //error inserting on table client
                                res.status(500).json(response)
                            } else {
                                let idClient = this.lastID;
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

exports.createMerchant = async (req, res, next) => {

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

    //check if any field is empty
    if (!email || !password || !repeatPassword || !address || !zipCode || 
        !location || !name || !category || !nipc || !description ||
        !contactNumber || !logo
        ) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //some field is empty
        res.status(400).json(response);
    //check if email invalid
    } else if (!validateEmail(email)) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //email invalid
        res.status(400).json(response);
    //check if password is invalid
    } else if (
        password.match(/[a-z]/g) === null || 
        password.match(/[A-Z]/g) === null || 
        password.match(/[0-9]/g) === null || 
        password.length < 8 ||
        password.length > 15 
    ) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //password invalid
        res.status(400).json(response)
    //check if password is not equal to repeatPassword
    } else if (password != repeatPassword) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //password is not equal to repeatPassword
        res.status(400).json(response)
    //check if zipCode is invalid
    } else if (!zipCode.match('[0-9]{4}[-]{1}[0-9]{3}')) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //zipCode invalid
        res.status(400).json(response)
    //check if location is invalid
    } else if (arrCountiesLowerCase.indexOf(location.toLowerCase()) == -1) {
        let response = {
            message: "failed",
            request: {
                type: 'POST',
                description: 'Criar uma empresa'
            }
        }
        //location invalid
        res.status(400).json(response)
    } else {
        logoPath = req.file.path;
        var db = require("../sql").db();

        const hash = await bcrypt.hashSync(password, 10);

        var sql = `INSERT INTO user(email, password, name, address, zipCode, location, typeUser)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        //execute sql command
        db.run(sql, [email, hash, name, address, zipCode, location, typeUser], 
            function (err) {
                if (err) {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'POST',
                            description: 'Criar uma empresa'
                        }
                    }
                    //error inserting on table user
                    res.status(500).json(response)
                } else {
                    var idUser = this.lastID;
                    sql = `INSERT INTO merchant(idUser, category, nipc, description, logo, contactNumber, canWork, 
                        isChecked) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    db.run(sql, [idUser, category, nipc, description, logoPath, contactNumber, canWork, isChecked], 
                        function (err) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar uma empresa'
                                    }
                                }
                                //error inserting on table merchant
                                res.status(500).json(response)
                            } else {
                                //create token
                                var token = jwt.sign({
                                    typeUser: typeUser,
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
                                        description: 'Criar uma empresa'
                                    }
                                }
                                //status 201 because was inserted in both of the tables
                                res.status(201).json(response)
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