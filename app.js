const restify = require('restify');
const config = require('./config/index');
const app = restify.createServer();
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const sa = require('./serverAction');
const mongoose = require('mongoose');

app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());

// app.use(rjwt({ secret: config.JWT_SECRET }).unless({
//     path: ['/api/auth', '/api/registration']
// }));

// ========= Handle promise =========

function catchErrors(callback) {
    return async function errorHandler(req, res, next) {
      try {
        await callback(req, res, next);
      } catch (err) {
        if (!(err instanceof restify.errors.HttpError))
          err = new restify.errors.InternalServerError(err);
        next(err);
      }
    }
}

app.on('InternalServer', function (req, res, err, next) {
  let cause = err.cause()
  if (cause && cause.name == 'ValidationError') {
    err.statusCode = 400;
    err.body.code = 'ValidationError';
    err.body.message = cause.message;
    err.body.details = cause.details;
  } else {
    log.error(err);
    err.body = 'Something went wrong.';
  }
  next();
})

const database = mongoose.connection;
database.on('error', (err) => {
    console.log(err);
})
// import api from routes file
database.once('open', () => {
    require('./routes/user')(app)
})

app.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,   
    }
    );
});