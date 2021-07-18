const http = require('http');
const url = require('url');

var server = http.createServer((req, res) => {
  var parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');
  res.end('Hello world!\n');

  console.log(`Request id received on path: ${trimmedPath}`);
});

server.listen(3000, () => {
  console.log('The server is listening on port 3000');
});