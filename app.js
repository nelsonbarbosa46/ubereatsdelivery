const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routeRegister = require('./routes/register');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 

app.use('/api/register', routeRegister);

//dont find the page
app.use((req, res, next) => {
    const err = new Error('Não Encontrado');
    err.status = 404;
    next(err);
});

module.exports = app;