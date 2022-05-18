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
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: 300 });
            const { iat, exp } = jwt.decode(token);
            const auth_user = await User.updateOne({email: email}, {$set: {token : token, expiresAt: exp}}, {upsert: true});
            res.send({ iat, exp, token })
            res.end()
            next();
        } catch (error) {
            return next(new errors.UnauthorizedError(error));
        }
    });

    server.put('/api/user/profile', (req, res, next) => {
        // var token = req.headers['x-access-token'];
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        // jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
        //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        //     res.status(200).send(decoded);
        //     next();
        // });
        console.log(req.headers);
        var token = req.headers['x-access-token'];
        if (!token) {
            res.status(401);
            res.send({ auth: false, message: 'No token provided.' });
        }
        try {
            const decoded = jwt.verify(token, pass);
            res.status(200);
            res.send('end');
            next()
        } catch (ex) {
            console.log(ex.messgage);
        }
    });
}