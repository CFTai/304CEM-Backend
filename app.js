const express = require('express')
const app = express()
const config =require('./config/index')
const auth = require('./routes/auth');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(
    config.MONGODB_URI
).then(
    () => {
        app.use('/auth', auth.router);
        app.listen(config.PORT, () => {
            console.log(`Example app listening on port ${config.PORT}`)
        });
}).catch(
    (err) => {
        console.log(`Error:  ${err}`)
});