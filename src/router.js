var handlers = {};

handlers.ping = function(data, callback) {
  callback(200);
};

handlers.sample = function(data, callback) {
  callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback) {
  callback(404);
};

const router = {
  'ping': handlers.ping,
  'sample': handlers.sample
};

module.exports = { router, handlers };