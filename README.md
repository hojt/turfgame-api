turfgame-api
============
Node module to access [Turf API](api.turfgame.com).

Installation
------------
```shell
npm install https://github.com/chrisjons/turfgame-api --save
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

Inspiration
-----------
* https://github.com/TheThingSystem/node-telldus-live
