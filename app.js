var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var app = express();

var routeRegister = require('./routes/register');
var routeLogin = require('./routes/login');
var routeUser = require('./routes/user');
var routeCheck = require('./middleware/checkToken');
var routeProduct = require('./routes/product');
var routeOrder = require('./routes/order');
var routeDelivery = require('./routes/delivery');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

//private key
process.env.PRIVATE_KEY = '2AEsX5ygzBzm';


//to solve CORS
// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Authorization', 'Bearer *');
    next();
});

//show which http code when having one request (show on terminal)
app.use(morgan('dev'));

app.use('/api/register', routeRegister);
app.use('/api/login', routeLogin);
app.use('/api/user', routeUser);
app.use('/api/check', routeCheck);
app.use('/api/product', routeProduct);
app.use('/api/order', routeOrder);
app.use('/api/delivery', routeDelivery);

//dont find the page
app.use((req, res, next) => {
    var err = new Error('Não Encontrado');
    err.status = 404;
    next(err);
});


module.exports = app;