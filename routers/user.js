const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../routes/auth');
const jwt = require('jsonwebtoken');
const config = require('../config');