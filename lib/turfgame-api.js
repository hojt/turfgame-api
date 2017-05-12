var util = require('util');
var events = require('events');
var https = require('https');

function TurfAPI() {

}
util.inherits(TurfAPI, events.EventEmitter);

TurfAPI.prototype.getStatistics = function (callback) {
  return this.get('/statistics', callback);
};

TurfAPI.prototype.get = function (path, callback) {

  var options = {
    hostname: 'api.turfgame.com',
    path: '/v4',
    method: 'GET',
  };

  options.path += path;

  var response = '';

  https.request(options, function (res) {

    res.on('data', function(d) {
      response += d;
    });

    res.on('end', function() {
      if (res.statusCode !== 200) {
        callback(new Error('Unsuccessful request - status code: ' + res.statusCode));
      } else {
        try {
          var responseObj = JSON.parse(response);
          callback(null, responseObj);
        } catch (ex) {
          callback(ex, null);
        }
      }
    });

  }).on('error', function(e) {
    callback(e, null);
  }).end();

};

module.exports = TurfAPI;
