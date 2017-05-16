'use strict';

var util = require('util');
var events = require('events');
var https = require('https');
var querystring = require('querystring');

var debug = require('debug')('turfgame-api');

// Turf API (http://api.turfgame.com/v4)
function TurfAPI() {
  this.api = {
    hostname: 'api.turfgame.com',
    pathprefix: '/v4',
  };
  debug('creating new Turf API: %o', this.api);
}
util.inherits(TurfAPI, events.EventEmitter);

// helper to parse dates (Date, String, timestamp) into query string
TurfAPI.prototype._afterDate2QueryString = function(afterDate) {
  if (afterDate) {
    if (!(afterDate instanceof Date)) {
      afterDate = new Date(afterDate);
    }
    var params = {
      'afterDate': afterDate.toISOString(),
    };
    params.afterDate = params.afterDate.replace(/\.\d+Z/, '+0000');
    return '?' + querystring.stringify(params);
  }
  return '';
};

// helper to parse feedTypes Array into path string
TurfAPI.prototype._feedTypes2PathString = function(feedTypes) {
  if (feedTypes && feedTypes instanceof Array) {
    return '/' + feedTypes.join('+');
  }
  return '';
};

//  GET /feeds (http://api.turfgame.com/v4#feeds) ?afterDate=...
TurfAPI.prototype.getFeeds = function (callback, afterDate) {
  var query = this._afterDate2QueryString(afterDate);
  return this._get('/feeds' + query, callback);
};

// GET /feeds/* (http://api.turfgame.com/v4#feeds) ?afterDate=...
TurfAPI.prototype.getFilteredFeeds = function(callback, feedTypes, afterDate) {
  var query = this._afterDate2QueryString(afterDate);
  var pathString = this._feedTypes2PathString(feedTypes);
  return this._get('/feeds' + pathString + query, callback);
};

//  GET /regions (http://api.turfgame.com/v4#regions)
TurfAPI.prototype.getRegions = function (callback) {
  return this._get('/regions', callback);
};

//  GET /rounds (http://api.turfgame.com/v4#rounds)
TurfAPI.prototype.getRounds = function (callback) {
  return this._get('/rounds', callback);
};

//  GET /statistics (http://api.turfgame.com/v4#statistics)
TurfAPI.prototype.getStatistics = function (callback) {
  return this._get('/statistics', callback);
};

TurfAPI.prototype._criteria2postDataString = function(criteria) {
  return JSON.stringify(criteria);
};

//  POST /users (http://api.turfgame.com/v4#users)
TurfAPI.prototype.findUsers = function (callback, criteria) {
  var postData = this._criteria2postDataString(criteria);
  return this._post('/users', postData, callback);
};

//  GET /users/location (http://api.turfgame.com/v4#usersLocation)
TurfAPI.prototype.getUsersLocation = function (callback) {
  return this._get('/users/location', callback);
};

//  GET /users/top (http://api.turfgame.com/v4#usersTop)
TurfAPI.prototype.getTopUsers = function (callback) {
  return this._get('/users/top', callback);
};

//  POST /users/top (http://api.turfgame.com/v4#usersTop)
TurfAPI.prototype.findTopUsers = function (callback, criteria) {
  var postData = this._criteria2postDataString(criteria);
  return this._post('/users/top', postData, callback);
};

//  POST /zones (http://api.turfgame.com/v4#zones)
TurfAPI.prototype.findZones = function (callback, criteria) {
  var postData = this._criteria2postDataString(criteria);
  return this._post('/zones', postData, callback);
};

//  GET /zones/all (http://api.turfgame.com/v4#zonesAll)
TurfAPI.prototype.getAllZones = function (callback) {
  return this._get('/zones/all', callback);
};


TurfAPI.prototype._get = function (path, callback) {

  var response = '';

  var options = {
    hostname: this.api.hostname,
    path: this.api.pathprefix + path,
    method: 'GET',
  };

  debug('Sending GET request: %o', options);

  https.request(options, function (res) {
    debug('Received GET response status code: %d', res.statusCode);

    res.on('data', function(d) {
      response += d;
    });

    res.on('end', function() {
      if (res.statusCode !== 200) {
        callback(new Error('Unsuccessful request - status code: ' + res.statusCode), null);
      } else {
        try {
          var responseObj = JSON.parse(response);
          debug('Received GET response data of length: %d', response.length);
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


TurfAPI.prototype._post = function (path, body, callback) {
  var response = '';

  var options = {
    hostname: this.api.hostname,
    path: this.api.pathprefix + path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  debug('Sending POST request: %o, body: %o', options, body);

  var req = https.request(options, function (res) {
    debug('Received POST response status code: %d', res.statusCode);

    res.on('data', function(d) {
      response += d;
    });

    res.on('end', function() {
      if (res.statusCode !== 200) {
        callback(new Error('Unsuccessful request - status code: ' + res.statusCode), null);
      } else {
        try {
          var responseObj = JSON.parse(response);
          debug('Received POST response data of length: %d', response.length);
          callback(null, responseObj);
        } catch (ex) {
          callback(ex, null);
        }
      }
    });

  }).on('error', function(e) {
    callback(e, null);
  });

  req.write(body);
  req.end();

};

module.exports = TurfAPI;
