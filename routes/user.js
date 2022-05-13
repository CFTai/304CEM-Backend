const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
const apiPath = require('../apiPath')

module.exports = server => {
    server.post(apiPath.authenticate, (req, res, next) => {
        const { email, pw, confirm_pw } = req.body;
        // double check password
        const user = new User({
            email,
            pw
        });
        // encrypt password 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.pw, salt, async (err, hash) => {
                if (err) throw err;
                user.pw = hash;
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message))
                }
            });
        })
    });

    server.post(apiPath.registration, async (req, res, next) => {
        const { email, pw } = req.body;
        try {
            const user = await auth.authenticate(email, pw);
            const token = jwt.sign(user.toJSON(). config.JWT_SECRET, { expiresIn: '20m' });
            const { iat, exp } = jwt.decode(token);

            res.send({iat, exp, token});
            console.log(iat, exp, token);
            next();
        } catch(error) {
            return next(new errors.UnauthorizedError(error));
        }
    });
}