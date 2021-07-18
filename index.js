const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const config = require('./config');

var server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const decoder = new StringDecoder('utf-8');

  var path = parsedUrl.pathname;  
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLocaleLowerCase();
  var headers = req.headers;
  var buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };
    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
      payload = typeof(payload) === 'object' ? payload : {};
      var payloadString = JSON.stringify(payload);
      res.writeHead(statusCode);
      res.setHeader('Content-Type', 'application/json');
      res.end(payloadString);
      console.log(`Returning response: ${statusCode} ${payloadString}`); 
    });    
  }); 
});

server.listen(config.port, () => {
  console.log(`The server is listening on port ${config.port} in ${config.envName} mode.`);
});

var handlers = {};

handlers.sample = function(data, callback) {
  callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback) {
  callback(404);
};

const router = {
  'sample': handlers.sample
};