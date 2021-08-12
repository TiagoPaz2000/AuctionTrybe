const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const Product = require('./controllers/productController');

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

require('./sockets/auction')(io);

app.use(cors());

app.get('/', Product.getAll);

server.listen(3001, () => console.log('app running'));
