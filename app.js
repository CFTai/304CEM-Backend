const restify = require('restify');
const config = require('./config/index');
const app = restify.createServer();
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');

app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());

app.use(rjwt({ secret: config.JWT_SECRET }).unless({
    path: ['/api/auth']
}));

app.listen(config.PORT, () => {
    console.log('%s listening at %s', app.name, app.url);
});

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

// ========= Method =========

app.post('/insert',
    catchErrors(async function(req, res , next) {
        // var result = await mongoDBClient.insertDataNew('testCollection2', req.params).catch(console.dir);
        req.result = result;
        return next();
    }),

    function(req, res, next) {
        console.log(req.result);
        res.send("success");
        return next();
    }
)
