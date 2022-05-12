const restify = require('restify');
const mongoDBClient = require('./serverAction');
const mongoose = require('mongoose');
const config = require('./config');

var server = restify.createServer({
  name: '304CEM Assignment by Stephen Tai',
  version: '1.0.0'
});

// ========= Setup Plugins =========

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser({ mapParams: true }));

// ========= Setup JWT_Secret =========

server.use(rjwt({ secret: config.JWT_SECRET}).unless({
  path: ['/api/auth']
}));

// ========= Handle promise =========

function catchErrors(callback) {
    return async function errorHandler(req, res, next) {
      try {
        await callback(req, res, next)
      } catch (err) {
        if (!(err instanceof restify.errors.HttpError))
          err = new restify.errors.InternalServerError(err)
        next(err)
      }
    }
}

server.on('InternalServer', function (req, res, err, next) {
  let cause = err.cause()
  if (cause && cause.name == 'ValidationError') {
    err.statusCode = 400
    err.body.code = 'ValidationError'
    err.body.message = cause.message
    err.body.details = cause.details
  } else {
    log.error(err)
    err.body = 'Something went wrong.'
  }
  next()
})

// ========= Method =========

server.get('/', function(req, res, next) {
    res.send('home')
    return next();
  });
  
server.post('/foo',
    function(req, res, next) {
      console.log("abc");
      req.someData = 'You are requestin post method';
      return next();
    },
    function(req, res, next) {
      res.send(req.someData);
      console.log('request sent');
      return next();
    }
);

server.post('/insert',
    catchErrors(async function(req, res , next) {
        var result = await mongoDBClient.insertDataNew('testCollection2', req.params).catch(console.dir);
        req.result = result;
        return next();
    }),

    function(req, res, next) {
        console.log(req.result);
        res.send("success");
        return next();
    }
)

server.put('/update',
    function(req, res, next) {
        console.log("Put method");
        req.someData = "Request received";
        return next();
    },
    function(req, res, next) {
        res.send(req.someData);
        return next();
    }
);

// server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
  mongoose.set('userFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});