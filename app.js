const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routeRegister = require('./routes/register');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

//to solve CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Content-Type, Origin, X-Requested-With, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS') {
        res.headers('Access-Control-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).send({});
    }

    next();
});


app.use('/api/register', routeRegister);

//dont find the page
app.use((req, res, next) => {
    const err = new Error('Não Encontrado');
    err.status = 404;
    next(err);
});

module.exports = app;