const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routeRegister = require('./routes/register');
const routeLogin = require('./routes/login');
const routeUser = require('./routes/user');

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

})

//show which http code when having one request (show on terminal)
app.use(morgan('dev'));

app.use('/api/register', routeRegister);
app.use('/api/login', routeLogin);
app.use('/api/user', routeUser);

//dont find the page
app.use((req, res, next) => {
    const err = new Error('Não Encontrado');
    err.status = 404;
    next(err);
});

module.exports = app;