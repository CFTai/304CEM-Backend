const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    URL: process.env.BASE_URL || 'http://localhost:8080',
    MONGODB_URI: 'mongodb://localhost:27017/304CEM-Development',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
}
