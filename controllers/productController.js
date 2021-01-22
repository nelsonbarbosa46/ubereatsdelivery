const jwt = require('jsonwebtoken');

function deleteImage(logo, fs) {
    //check if logo is uploaded
    if (logo) {
        //delete new image because was error on update
        fs.unlink(logo, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}

exports.createProduct = (req, res, next) => {
    
    var idUser = req.body.idUser;
    var name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var parseQuantity = parseInt(quantity);
    var description = req.body.description;
    var logo = req.file;
    const fs = require('fs');

    //check if empty
    if (!logo) {
        logo = null;
    } else {
        logo = req.file.path;
    }

    const tokenUnsplited = req.headers.authorization;
    //check if token is empty
    if (!tokenUnsplited) {
        deleteImage(logo, fs);
        let response = {
            message: "failed",
            typeError: "Não existe token",
            request: {
                type: 'POST',
                description: 'Criar um produto'
            }
        }
        //token empty
        res.status(401).json(response)
    } else {    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        //check if typeUser is equal to 2 (type Merchant) and if idMerchant is equal to id inside a token
        if (decoded.typeUser != 2 || decoded.id != idUser) {
            deleteImage(logo, fs);
            let response = {
                message: "failed",
                typeError: "Token inválido",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //typeUser or id is invalid
            res.status(401).json(response)
        //check if any field is empty
        } else if (!name || !price || !quantity) {
            deleteImage(logo, fs);
            let response = {
                message: "failed",
                typeError: "Algum campo está vazio",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //some field is empty
            res.status(400).json(response)
        //check if quantity is invalid
        } else if (!parseQuantity || quantity < 0) {
            deleteImage(logo, fs);
            let response = {
                message: "failed",
                typeError: "Quantidade inválida",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //quantity is invalid
            res.status(400).json(response)
        //check if price is invalid
        } else if (isNaN(price) || price < 0) {
            deleteImage(logo, fs);
            let response = {
                message: "failed",
                typeError: "Preço inválido",
                request: {
                    type: 'POST',
                    description: 'Criar um produto'
                }
            }
            //price is invalid
            res.status(400).json(response)
        } else {
            

            //check if its empty
            if (!description) {
                description = null;
            }

            var db = require('../sql').db();
            var sql = `SELECT id FROM merchant WHERE idUser = ?`;
            db.get(sql, [idUser], function (err, row) {
                if (err) {
                    deleteImage(logo, fs);
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'POST',
                            description: 'Criar um produto'
                        }
                    }
                    //error selecting
                    res.status(500).json(response)
                } else {
                    if (row) {
                        var idMerchant = row.id;
                        sql = `SELECT name FROM product WHERE name = ? AND idMerchant = ?`;
                        db.get(sql, [name, idMerchant], function (err, row) {
                            if (err) {
                                deleteImage(logo, fs);
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'POST',
                                        description: 'Criar um produto'
                                    }
                                }
                                //error selecting
                                res.status(500).json(response)
                            } else {
                                if (row) {
                                    deleteImage(logo, fs);
                                    let response = {
                                        message: "failed",
                                        typeError: "o nome do produto já existe",
                                        request: {
                                            type: 'POST',
                                            description: 'Criar um produto'
                                        }
                                    }
                                    //product already exists
                                    res.status(500).json(response)
                                } else {
                                    sql = `INSERT INTO product(idMerchant, name, price, quantity, description, image) VALUES 
                                    (?, ?, ?, ?, ?, ?)`;
                                    db.run(sql, [idMerchant, name, price, quantity, description, logo], function (err) {
                                        if (err) {
                                            deleteImage(logo, fs);
                                            let response = {
                                                message: "failed",
                                                typeError: "Erro na BD",
                                                request: {
                                                    type: 'POST',
                                                    description: 'Criar um produto'
                                                }
                                            }
                                            //error inserting
                                            res.status(500).json(response)
                                        } else {
                                            let response = {
                                                message: "success",
                                                newProduct: {
                                                    name: name,
                                                    price: price,
                                                    quantity: quantity,
                                                    description: description
                                                },
                                                request: {
                                                    type: 'POST',
                                                    description: 'Criar uma empresa'
                                                }
                                            }
                                            res.status(201).json(response)
                                        }
                                    })
                                }
                            }
                        });  
                    } else {  
                        deleteImage(logo, fs);          
                        let response = {
                            message: "failed",
                            typeError: "Não encontrou nenhuma empresa",
                            request: {
                                type: 'POST',
                                description: 'Criar um produto'
                            }
                        }
                        //dont find merchant
                        res.status(500).json(response)
                    }
                }
            });
            
            db.close();
        }
    }
    return;
}

exports.deleteProduct = (req, res, next) => {
    var idProduct = req.params.idProduct;
    var idUser = req.params.idUser;

    const tokenUnsplited = req.headers.authorization;
    //check if token is empty
    if (!tokenUnsplited) { 
        let response = {
            message: "failed",
            typeError: "Token inválido",
            request: {
                type: 'POST',
                description: 'Eliminar um produto'
            }
        }
        //token empty
        res.status(401).json(response)
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        if (decoded.typeUser != 2 || decoded.id != idUser) {
            let response = {
                message: "failed",
                typeError: "Token inválido",
                request: {
                    type: 'DELETE',
                    description: 'Eliminar um produto'
                }
            }
            //typeUser or id is invalid
            res.status(401).json(response)
        } else {
            var db = require("../sql").db();
            var sql = 'SELECT id FROM merchant WHERE idUser = ?';
            db.get(sql, [idUser], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'DELETE',
                            description: 'Eliminar um produto'
                        }
                    }
                    res.status(500).json(response)
                } else if (row) {
                    var idMerchant = row.id;
                    var sql = 'DELETE FROM product WHERE id = ? AND idMerchant = ?';
                    db.run(sql, [idProduct, idMerchant], function (err){
                        if (err){
                            let response = {
                                message: "failed",
                                typeError: "Erro na BD",
                                request: {
                                    type: 'DELETE',
                                    description: 'Eliminar Produto'
                                }
                            }
                            res.status(500).json(response)
                        } else {
                            res.status(204).json()
                        }
                    });
                } else {
                    let response = {
                        message: "failed",
                        typeError: "Não encontrou a empresa",
                        request: {
                            type: 'DELETE',
                            description: 'Eliminar um produto'
                        }
                    }
                    res.status(500).json(response)
                }
            })
            
            db.close();
        }
    }
    
    return;
}

exports.changeInfoProduct = (req, res, next) => {
    
    var idUser = req.params.id;
    var idProduct = req.params.idProduct;
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;

    const tokenUnsplited = req.headers.authorization;
    //check if token is empty
    if (!tokenUnsplited) {
        let response = {
            message: "failed",
            typeError: "Não existe token",
            request: {
                type: 'POST',
                description: 'Criar um produto'
            }
        }
        //token empty
        res.status(401).json(response)
    } else {   
    
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    
        //check if typeUser is invalid
        if (decoded.typeUser != 2) {
            let response = {
                message: "failed",
                typeError: "Token inválido",
                request: {
                    type: 'PUT',
                    description: 'Alterar informações de um produto'
                }
            }
            //typeUser is invalid
            res.status(401).json(response)
        //check if any field is empty
        } else if (!name || !price) {
            let response = {
                message: "failed",
                typeError: "Algum campo está vazio",
                request: {
                    type: 'PUT',
                    description: 'Alterar informações de um produto'
                }
            }
            //some field is empty
            res.status(400).json(response)
        //check if price is invalid
        } else if (isNaN(price) || price < 0) {
            let response = {
                message: "failed",
                typeError: "Preço inválido",
                request: {
                    type: 'PUT',
                    description: 'Alterar informações de um produto'
                }
            }
            //price is invalid
            res.status(400).json(response)
        } else {
            var db = require('../sql').db();
            var sql = `SELECT id FROM merchant WHERE idUser = ?`;
            db.get(sql, [idUser], function (err, row) {
                if (err) {
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'PUT',
                            description: 'Alterar informações de um produto'
                        }
                    }
                    //error selecting
                    res.status(500).json(response)
                } else {
                    if (row) {
                        var idMerchant = row.id;
                        sql = `SELECT id, name FROM product WHERE name = ? AND idMerchant = ?`;
                        db.get(sql, [name, idMerchant], function (err, row) {
                            if (err) {
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar informações de um produto'
                                    }
                                }
                                //error selecting
                                res.status(500).json(response)
                            } else {
                                //check that there is no similar name in another product except the product you want to change
                                if (!row || (row.name == name && row.id == idProduct)) {
                                    sql = `UPDATE product SET name = ?, price = ?, description = ? WHERE id = ? AND idMerchant = ?`;
                                    db.run(sql, [name, price, description, idProduct, idMerchant], function (err) {
                                        if (err) {
                                            let response = {
                                                message: "failed",
                                                typeError: "Erro na BD",
                                                request: {
                                                    type: 'PUT',
                                                    description: 'Alterar informações de um produto'
                                                }
                                            }
                                            //error updating
                                            res.status(500).json(response)
                                        } else {
                                            if (this.changes == 0) {
                                                let response = {
                                                    message: "failed",
                                                    typeError: "Não foi alterado",
                                                    request: {
                                                        type: 'PUT',
                                                        description: 'Alterar informações de um produto'
                                                    }
                                                }
                                                //dont update
                                                res.status(500).json(response)
                                            } else {
                                                let response = {
                                                    message: "success",
                                                    updateInfo: {
                                                        name: name,
                                                        price: price,
                                                        description: description
                                                    },
                                                    request: {
                                                        type: 'PUT',
                                                        description: 'Alterar informações de um produto'
                                                    }
                                                }
                                                //error updating
                                                res.status(200).json(response)
                                            }
                                        }
                                    });
                                } else {
                                    let response = {
                                        message: "failed",
                                        typeError: "O nome que inseriu já existe",
                                        request: {
                                            type: 'PUT',
                                            description: 'Alterar informações de um produto'
                                        }
                                    }
                                    //already exists name
                                    res.status(500).json(response)
                                }
                            }
                        });
                    } else {
                        let response = {
                            message: "failed",
                            typeError: "Erro na BD",
                            request: {
                                type: 'PUT',
                                description: 'Alterar informações de um produto'
                            }
                        }
                        //dont get id
                        res.status(500).json(response)
                    }
                }
            });
            db.close();
        }
    }
    
    return;
}

exports.changeLogoProduct = (req, res, next) => {

    var idUser = req.params.id;
    var idProduct = req.params.idProduct;
    var logo = req.file;
    var fs = require('fs');

    //check if empty
    if (!logo) {
        logo = null;
    } else {
        logo = req.file.path;
    }

    const tokenUnsplited = req.headers.authorization;
    //check if token is empty
    if (!tokenUnsplited) {
        deleteImage(logo, fs);
        let response = {
            message: "failed",
            typeError: "Não existe token",
            request: {
                type: 'POST',
                description: 'Criar um produto'
            }
        }
        //token empty
        res.status(401).json(response)
    } else {   
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        //check if typeUser is invalid
        if (decoded.typeUser != 2) {
            deleteImage(logo, fs);
            let response = {
                message: "failed",
                typeError: "Token Inválido",
                request: {
                    type: 'PUT',
                    description: 'Alterar logótipo de um produto'
                }
            }
            //typeUser is invalid
            res.status(401).json(response)
        } else {
            var db = require('../sql').db();
            var sql = `SELECT id FROM merchant WHERE idUser = ?`;
            
            db.get(sql, [idUser], function (err, row) {
                if (err) {
                    deleteImage(logo, fs);
                    let response = {
                        message: "failed",
                        typeError: "Erro na BD",
                        request: {
                            type: 'PUT',
                            description: 'Alterar logótipo de um produto'
                        }
                    }
                    //error selecting
                    res.status(500).json(response)
                } else {
                    if (row) {
                        var idMerchant = row.id;
                        sql = `SELECT image FROM product WHERE id = ? AND idMerchant = ?`;
                        db.get(sql, [idProduct, idMerchant], function (err, row) {
                            if (err) {
                                deleteImage(logo, fs);
                                let response = {
                                    message: "failed",
                                    typeError: "Erro na BD",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar logótipo de um produto'
                                    }
                                }
                                //error selecting
                                res.status(500).json(response)
                            } else {
                                if (row) {
                                    var oldImage = row.image;
                                    sql = `UPDATE product SET image = ? WHERE id = ? AND idMerchant = ?`;
                                    db.run(sql, [logo, idProduct, idMerchant], function (err) {
                                        if (err) {
                                            deleteImage(logo, fs);
                                            let response = {
                                                message: "failed",
                                                typeError: "Erro na BD",
                                                request: {
                                                    type: 'PUT',
                                                    description: 'Alterar logótipo de um produto'
                                                }
                                            }
                                            //error updating
                                            res.status(500).json(response)
                                        } else {
                                            //check if its updated
                                            if (this.changes == 0) {
                                                deleteImage(logo, fs);
                                                let response = {
                                                    message: "failed",
                                                    typeError: "Não alterou",
                                                    request: {
                                                        type: 'PUT',
                                                        description: 'Alterar logótipo de um produto'
                                                    }
                                                }
                                                //error updating
                                                res.status(500).json(response)
                                            } else {
                                                //delete old image
                                                deleteImage(oldImage, fs);
                                                let response = {
                                                    message: "success",
                                                    newImage: logo,
                                                    request: {
                                                        type: 'PUT',
                                                        description: 'Alterar logótipo de um produto'
                                                    }
                                                }
                                                //update successful
                                                res.status(200).json(response)
                                            }
                                        }
                                    });
                                } else {
                                    deleteImage(logo, fs);
                                    let response = {
                                        message: "failed",
                                        typeError: "Erro na BD",
                                        request: {
                                            type: 'PUT',
                                            description: 'Alterar logótipo de um produto'
                                        }
                                    }
                                    //error updating
                                    res.status(500).json(response)
                                }
                            }
                        });
                    } else {
                        deleteImage(logo, fs);
                        let response = {
                            message: "failed",
                            request: {
                                type: 'PUT',
                                description: 'Alterar logótipo de um produto'
                            }
                        }
                        //dont find any merchant
                        res.status(500).json(response)
                    }
                }
            });

            db.close();
        }
    }
    return;
}

exports.showProducts = (req, res, next) =>{
    var idMerchant = req.params.idMerchant;

    var db = require("../sql").db();
    var sql = `SELECT * FROM product WHERE idMerchant = ?`;

    db.all(sql, [idMerchant], function(err, rows){
        if(err){
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'SELECIONAR PRODUTO'
                }
            }
            res.status(500).json(response);
        } else {
            let response = {
                message: "success",
                result: rows,
                request: {
                    type: 'GET',
                    description: 'SELECIONAR PRODUTO'
                }
            }
            res.status(200).json(response);
        }
        db.close();
    });
    return;
}

exports.getProductsMe = (req, res, next) => {
    
    var idUser = req.params.id;
    
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is invalid
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            typeError: "Token inválido",
            request: {
                type: 'GET',
                description: 'Obter Produtos de uma empresa'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    } else { 

        function getProductsSQL() {
            return new Promise ((resolve, reject) => {
                var db = require("../sql").db();
                var sql = `SELECT product.id, product.description, product.image, product.name, product.price, product.quantity
                FROM product INNER JOIN merchant ON product.idMerchant = merchant.id WHERE merchant.idUser = ?`;
                var query = [];

                db.each(sql, [idUser], function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        query.push(
                            {
                                id: row.id,
                                description: row.description,
                                image: row.image,
                                name: row.name,
                                price: row.price,
                                quantity: row.quantity
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

        getProductsSQL().then(function (data) {
            let response = {
                message: "success",
                listProducts: data,
                request: {
                    type: 'GET',
                    description: 'Obter Produtos de uma empresa'
                }
            };
            //successful
            res.status(200).json(response);
        //got a error 
        }).catch(function () {
            let response = {
                message: "failed",
                typeError: "Erro na BD",
                request: {
                    type: 'GET',
                    description: 'Obter Produtos de uma empresa'
                }
            }
            //error selecting
            res.status(500).json(response)
        });

    }
    
    return;
}

exports.changeQuantityProduct = (req, res, next) => {

    var idUser = req.params.id;
    var idProduct = req.params.idProduct;
    var quantity=req.body.quantity;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    //check if typeUser is invalid
    if (decoded.typeUser != 2) {
        let response = {
            message: "failed",
            typeError: "Token inválido",
            request: {
                type: 'PUT',
                description: 'Alterar quantidade do produto'
            }
        }
        //typeUser is invalid
        res.status(401).json(response)
    } else {
        var db = require('../sql').db();
        var sql = `SELECT id FROM merchant WHERE idUser = ?`;
        
        db.get(sql, [idUser], function (err, row) {
            if (err) {
                let response = {
                    message: "failed",
                    typeError: "Erro na BD",
                    request: {
                        type: 'PUT',
                        description: 'Alterar quantidade do produto'
                    }
                }
                //error selecting
                res.status(500).json(response)
            } else {
                if (row) {
                    var idMerchant = row.id;
                    sql = `UPDATE product SET quantity = ? WHERE id = ? AND idMerchant = ?`;
                    db.run(sql, [quantity, idProduct, idMerchant], function (err) {
                        if (err) {
                            let response = {
                                message: "failed",
                                typeError: "Erro na BD",
                                request: {
                                    type: 'PUT',
                                    description: 'Alterar Quantidade do produto'
                                }
                            }
                            //error updating
                            res.status(500).json(response)
                        } else {
                            //check if its updated
                            if (this.changes == 0) {
                                let response = {
                                    message: "failed",
                                    typeError: "Não alterou",
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar quantidade do produto'
                                    }
                                }
                                //error updating
                                res.status(500).json(response)
                            } else {
                                let response = {
                                    message: "success",
                                    newQuantity: quantity,
                                    request: {
                                        type: 'PUT',
                                        description: 'Alterar quantidade do produto'
                                    }
                                }
                                //update successful
                                res.status(200).json(response)
                            }
                        }
                    });
                } else {
                    let response = {
                        message: "failed",
                        typeError: "Não encontrou a empresa",
                        request: {
                            type: 'PUT',
                            description: 'Alterar quantidade do produto'
                        }
                    }
                    //dont find any merchant
                    res.status(500).json(response)
                }
            }
        });

        db.close();

    }

    return;
}