const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const routeRegister = require('./routes/register');
const routeLogin = require('./routes/login');
const routeUser = require('./routes/user');
const routeCheck = require('./middleware/check');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 


//to solve CORS
// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

//show which http code when having one request (show on terminal)
app.use(morgan('dev'));

app.use('/api/register', routeRegister);
app.use('/api/login', routeLogin);
app.use('/api/user', routeUser);
app.use('/api/check', routeCheck);

//dont find the page
app.use((req, res, next) => {
    const err = new Error('Não Encontrado');
    err.status = 404;
    next(err);
});


module.exports = app;