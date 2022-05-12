var restify = require('restify');
var mongoDBClient = require('./serverAction');



function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}


var server = restify.createServer({
    name: 'Hello World!',
    version: '1.0.0'
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser({ mapParams: true }));

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

server.put('/foo',
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

server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

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