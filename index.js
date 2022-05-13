const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');
const server = restify.createServer();

server.use(restify.plugins.bodyParser())

server.use(rjwt({
        secret: config.JWT_SECRET
    }).unless({ 
        path: [
            '/api/auth'
        ]
    })
);

server.listen(config.PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
    mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

database.once('open', ()=> {
    require('./routes/user');
    console.log(`Server running on Port: ${config.PORT}`);    
})