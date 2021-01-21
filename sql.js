const sqlite3 = require('sqlite3').verbose();

exports.db = function () {
    let db = new sqlite3.Database('./db/infood.db', (err) => {
        if (err) {
            return console.log(err.message);
        }
    
        console.log('Connected to SQLite');
    });
    db.run('PRAGMA busy_timeout = 6000');
    db.configure("busyTimeout", 6000);
    return db;
};