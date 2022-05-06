var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
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

server.put('/foo',
    function(req, res, next) {
        console.log(req);
        console.log('\n');
        console.log('================================================\n');
        console.log('\n');
        console.log(res);
        console.log('\n');
        console.log('================================================\n');
        console.log('\n');
        console.log(next);
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

