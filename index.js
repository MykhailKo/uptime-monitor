const http = require('http');
const https = require('https');
const fs = require('fs');

const config = require('./config');
const unifiedServer = require('./src/unified-server');

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log(`The server is listening on port ${config.httpPort} in ${config.envName} mode.`);
});

httpsServer.listen(config.httpsPort, () => {
  console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} mode.`);
});
