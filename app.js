const express = require('express')
const app = express()
const config =require('./config/index')
const auth = require('./routes/auth');
const user = require('./routes/user');
const product = require('./routes/product');
const order = require('./routes/order');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(
    config.MONGODB_URI
).then(
    () => {
        app.use('/auth', auth.router);
        app.use('/user', user.router);
        app.use('/product', product.router);
        app.use('/order', order.router);
        app.listen(config.PORT, () => {
            console.log(`304CEM-Backend is listening on port ${config.PORT}`)
        });
}).catch(
    (err) => {
        console.log(`Error:  ${err}`)
});