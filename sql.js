const sqlite3 = require('sqlite3').verbose();

exports.db = function () {
    return new sqlite3.Database('./db/infood.db', (err) => {
        if (err) {
            return console.log(err.message);
        }
    
        console.log('Connected to SQLite');
    });
};