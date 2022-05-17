const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const apiPath = require('./apiPath')

module.exports = server => {
    server.post('/api/registration', async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            // double check password
            const userExist = await User.find({ email: email });
            if (userExist.length > 0)
                return next(new errors.BadRequestError("Email address already exists" ))
            const user = new User({
                username,
                email,
                password,
            });
            // encrypt password 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    const newUser = await user.save();
                    res.status(201);
                    res.send(newUser);
                    next();
                });
            })
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    });

    server.post('/api/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await auth.authenticate(email, password);
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '20m' });
            const { iat, exp } = jwt.decode(token);
            const auth_user = await User.updateOne({email: email}, {$set: {token : token, expiresAt: exp}}, {upsert: true});
            console.log(auth_user);
            res.send({ iat, exp, token })
            next();
        } catch (error) {
            return next(new errors.UnauthorizedError(error));
        }
    });

    server.put('/api/user/profile', async (req, res, next) => {
        const {username, password} = req.body;
        try {
            const user = await User.findOne({"sessions.token": session_token})
        } catch (error) {6666
            return next(new errors.UnauthorizedError(error));
        }
    });
}