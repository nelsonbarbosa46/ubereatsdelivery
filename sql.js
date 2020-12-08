const sqlite3 = require('sqlite3').verbose();

exports.db = function () {
    return new sqlite3.Database('./db/ubereatsdelivery.db', (err) => {
        if (err) {
            return console.log(err.message);
        }
    
        console.log('Connected to SQLite');
    });
};