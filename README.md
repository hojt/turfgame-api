turfgame-api
============
[![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Node module to access [Turf API](http://api.turfgame.com).

Implemented as an exercise in NodeJS coding. Review and feedback highly appreciated!

Installation
------------
```shell
npm install https://github.com/hojt/turfgame-api --save
```

Usage
-----
```javascript
var TurfAPI = require('turfgame-api');
var turf = new TurfAPI();

turf.getStatistics(function(err, data) {
  if (err) {
    throw new Error("Failed to get statistics: " + err);
  }
  console.log("Got statistics: ", data);
});
```

Debug
-----
```shell
DEBUG=turfgame-api node your-app.js
```

Inspiration
-----------
* https://github.com/TheThingSystem/node-telldus-live

[npm-url]: https://npmjs.org/package/turfgame-api
[downloads-image]: http://img.shields.io/npm/dm/turfgame-api.svg
[npm-image]: http://img.shields.io/npm/v/turfgame-api.svg
[travis-url]: https://travis-ci.org/hojt/turfgame-api?branch=master
[travis-image]: https://travis-ci.org/hojt/turfgame-api.svg?branch=master
