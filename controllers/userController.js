

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