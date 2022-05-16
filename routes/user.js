const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const apiPath = require('./apiPath')

module.exports = server => {
    server.post('/api/registration', (req, res, next) => {
        const { email, password } = req.body;
        // double check password
        const user = new User({
            email,
            password
        });
        // encrypt password 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) throw err;
                user.password = hash;
                try {
                    const newUser = await user.save();
                    res.status(201);
                    res.send(newUser);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message))
                }
            });
        })
    });

    server.post('/api/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await auth.authenticate(email, password);
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '20m' });
            const { iat, exp } = jwt.decode(token);

            res.send({iat, exp, token})
            next();
        } catch(error) {
            return next(new errors.UnauthorizedError(error));
        }
    });
}