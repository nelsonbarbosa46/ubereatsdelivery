const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;
const host = '0.0.0.0';
const server = http.createServer(app);

console.log(port);

server.listen(port, host);