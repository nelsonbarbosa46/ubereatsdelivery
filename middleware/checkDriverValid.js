const jwt = require('jsonwebtoken');

//check if merchant is checked and can continue
module.exports = (req, res, next) => {
    const tokenUnsplited = req.headers.authorization;
    if (!tokenUnsplited) {
        let response = {
            "message": "failed",
            "description": "O condutor ainda não foi verificado ou não pode fazer esta função"
        };
        res.status(401).json(response);
    } else {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        if (decoded.typeUser == '1') {
            var idUser = decoded.id;

            function checkCanWorkSQL() {
                return new Promise ((resolve, reject) => {
                    var db = require("../sql").db();
                    var sql = `SELECT canWork FROM driver 
                    INNER JOIN client ON driver.idClient = client.id WHERE client.idUser = ?`;
                    db.get(sql, [idUser], function (err, row) {
                    }, function (err, row) {
                        db.close();
                        if (err) {
                            reject(err);
                        } else if (row){
                            resolve(row);
                        } else {
                            reject();
                        }
                    });
                });
            }

            var varErr;
    
            checkCanWorkSQL().then(function (data) {
                if (!data) {
                    varErr = 0;
                } else if (data.canWork != 1) {
                    varErr = 1;
                } else {
                    varErr = 2;
                } 
            }).catch(function () {
                varErr = 3;
            }).finally(function () {
                if (varErr == '2') {
                    next();
                } else {
                    let response = {
                        "message": "failed",
                        "description": "O condutor ainda não foi verificado ou não pode fazer esta função"
                    };
                    res.status(401).json(response);
                }
            });
        } else {
            let response = {
                "message": "failed",
                "description": "O condutor ainda não foi verificado ou não pode fazer esta função"
            };
            res.status(401).json(response);
        }
    }
}