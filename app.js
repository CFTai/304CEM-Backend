const express = require('express')
const app = express()
const config =require('./config/index')
const auth = require('./routes/auth');
const user = require('./routes/user');
const product = require('./routes/product');
const order = require('./routes/order');
const player = require('./routes/player');
const mongoose = require('mongoose');
var cors = require('cors');

const corsOptions = {
    origin: [
      'http://www.example.com',
      'http://localhost:8080',
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(
    config.MONGODB_URI
).then(
    () => {
        app.use('/auth', auth.router);
        app.use('/user', user.router);
        app.use('/product', product.router);
        app.use('/order', order.router);
        app.use('/player', player.router);
        app.listen(config.PORT, () => {
            console.log(`304CEM-Backend is listening on port ${config.PORT}`)
        });
}).catch(
    (err) => {
        console.log(`Error:  ${err}`)
});