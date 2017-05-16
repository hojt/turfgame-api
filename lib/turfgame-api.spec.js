'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinon_chai = require("sinon-chai");
chai.should();
chai.use(sinon_chai);

var nock = require('nock');
nock.disableNetConnect();

var https = require('https');

var TurfGameAPI = require('./turfgame-api.js');
var turf = new TurfGameAPI();

describe('TurfAPI', function() {


  // -- getFeeds

  describe('getFeeds', function() {

    it('should expose a function getFeeds', function () {
      expect(turf.getFeeds).to.be.a('function');
    });

    it('should request /feeds', function (done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds')
        .reply(200, {});

      turf.getFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      });
    });

    it('should handle an error response from /feeds', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds')
        .reply(404);

      turf.getFeeds(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockFeeds.done();
        done();
      });
    });

    it('should support query parameter: afterDate as Date', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, new Date('2017-05-13T22:12:34'));
    });

    it('should support query parameter: afterDate as String', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, '2017-05-13T22:12:34');
    });

    it('should support query parameter: afterDate as timestamp', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, 1494713554000);
    });

  });

  describe('getFilteredFeeds', function() {

    it('should expose a function getFilteredFeeds', function () {
      expect(turf.getFilteredFeeds).to.be.a('function');
    });

    it('should request /feeds', function (done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      });
    });

    it('should handle an error response from /feeds', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds')
        .reply(404);

      turf.getFilteredFeeds(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockFeeds.done();
        done();
      });
    });


    it('should support filtering by feed type: takeover', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/takeover')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['takeover']);
    });

    it('should support filtering by feed type: medal', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/medal')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['medal']);
    });

    it('should support filtering by feed type: chat', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/chat')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['chat']);
    });

    it('should support filtering by feed type: zone', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/zone')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['zone']);
    });

    it('should support filtering by multiple feed type: chat and medal', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/chat+medal')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['chat', 'medal']);
    });

    it('should support filtering by multiple feed type: takeover and zone', function(done) {
      var nockFeeds = nock('https://api.turfgame.com')
        .get('/v4/feeds/takeover+zone')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockFeeds.done();
        done();
      }, ['takeover', 'zone']);
    });

    it('should support query parameter: afterDate as Date', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds/chat+medal?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, ['chat', 'medal'], new Date('2017-05-13T22:12:34'));
    });

    it('should support query parameter: afterDate as String', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds/takeover+zone?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, ['takeover', 'zone'], '2017-05-13T22:12:34');
    });

    it('should support query parameter: afterDate as timestamp', function(done) {
      var nockFeedsAfterDate = nock('https://api.turfgame.com')
        .get('/v4/feeds/chat?afterDate=2017-05-13T22%3A12%3A34%2B0000')
        .reply(200, {});

      turf.getFilteredFeeds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        done();
      }, ['chat'], 1494713554000);
    });

  });


  // -- getRegions

  describe('getRegions', function () {

    it('should expose a function getRegions', function () {
      expect(turf.getRegions).to.be.a('function');
    });

    it('should request /regions', function (done) {
      var nockRegions = nock('https://api.turfgame.com')
        .get('/v4/regions')
        .reply(200, {});

      turf.getRegions(function (err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockRegions.done();
        done();
      });
    });

    it('should handle an error response from /regions', function(done) {
      var nockRegions = nock('https://api.turfgame.com')
        .get('/v4/regions')
        .reply(404);

      turf.getRegions(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockRegions.done();
        done();
      });
    });

  });


  // -- getRounds

  describe('getRounds', function() {

    it('should expose a function getRounds', function () {
      expect(turf.getRounds).to.be.a('function');
    });

    it('should request /rounds', function (done) {
      var nockRounds = nock('https://api.turfgame.com')
        .get('/v4/rounds')
        .reply(200, {});

      turf.getRounds(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockRounds.done();
        done();
      });
    });

    it('should handle an error response from /rounds', function(done) {
      var nockRounds = nock('https://api.turfgame.com')
        .get('/v4/rounds')
        .reply(404);

      turf.getRounds(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockRounds.done();
        done();
      });
    });
  });


  // -- getStatistics

  describe('getStatistics', function() {

    it('should expose a function getStatistics', function () {
      expect(turf.getStatistics).to.be.a('function');
    });

    it('should request /statistics', function (done) {
      var nockStats = nock('https://api.turfgame.com')
        .get('/v4/statistics')
        .reply(200, {});

      turf.getStatistics(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockStats.done();
        done();
      });
    });

    it('should handle an error response from /statistics', function(done) {
      var nockStats = nock('https://api.turfgame.com')
        .get('/v4/statistics')
        .reply(404);

      turf.getStatistics(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockStats.done();
        done();
      });
    });
  });


  // --findUsers

  describe('findUsers', function() {

    it('should expose a function findUsers', function () {
      expect(turf.findUsers).to.be.a('function');
    });

    it('should post to /users', function(done) {
      var criteria = [
        {
          name: 'TestTurfer'
        }
      ];
      var response = [
        {
          name: 'TestTurfer'
        }
      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/users', JSON.stringify(criteria))
      .reply(200, JSON.stringify(response));

      turf.findUsers(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

    it('should handle an error response from /users', function(done) {
      var criteria = [
        {
          name: 'TestTurfer'
        }
      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/users', JSON.stringify(criteria))
      .reply(404);

      turf.findUsers(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

  });


  // -- getUsersLocation

  describe('getUsersLocation', function() {

    it('should expose a function getUsersLocation', function () {
      expect(turf.getUsersLocation).to.be.a('function');
    });

    it('should request /users/location', function (done) {
      var nockUserLoc = nock('https://api.turfgame.com')
        .get('/v4/users/location')
        .reply(200, {});

      turf.getUsersLocation(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockUserLoc.done();
        done();
      });
    });

    it('should handle an error response from /users/location', function(done) {
      var nockUserLoc = nock('https://api.turfgame.com')
        .get('/v4/users/location')
        .reply(404);

      turf.getUsersLocation(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockUserLoc.done();
        done();
      });
    });
  });


  // -- getTopUsers

  describe('getTopUsers', function() {

    it('should expose a function getTopUsers', function () {
      expect(turf.getTopUsers).to.be.a('function');
    });

    it('should request /users/top', function (done) {
      var nockUserTop = nock('https://api.turfgame.com')
        .get('/v4/users/top')
        .reply(200, {});

      turf.getTopUsers(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockUserTop.done();
        done();
      });
    });

    it('should handle an error response from /users/top', function(done) {
      var nockUserTop = nock('https://api.turfgame.com')
        .get('/v4/users/top')
        .reply(404);

      turf.getTopUsers(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockUserTop.done();
        done();
      });
    });
  });


  // -- findTopUsers

  describe('findTopUsers', function() {

    it('should expose a function findTopUsers', function () {
      expect(turf.findTopUsers).to.be.a('function');
    });

    it('should post to /users/top', function(done) {
      var criteria = [
        {
          country: 'se',
          from: 1,
          top: 10
        }
      ];
      var response = [

      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/users/top', JSON.stringify(criteria))
      .reply(200, JSON.stringify(response));

      turf.findTopUsers(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

    it('should handle error response from /users/top', function(done) {
      var criteria = [
        {
          region: 'norrbotten',
          from: 1,
          top: 10
        }
      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/users/top', JSON.stringify(criteria))
      .reply(404);

      turf.findTopUsers(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

  });


  // -- findZones

  describe('findZones', function() {

    it('should expose a function findZones', function () {
      expect(turf.findZones).to.be.a('function');
    });

    it('should post to /zones', function(done) {
      var criteria = [
        {
          region: 'norrbotten',
          from: 1,
          top: 10
        }
      ];
      var response = [
        {

        }
      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/zones', JSON.stringify(criteria))
      .reply(200, JSON.stringify(response));

      turf.findZones(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

    it('should handle error response from /zones', function(done) {
      var criteria = [
        {
          region: 'norrbotten',
          from: 1,
          top: 10
        }
      ];
      var nockUsers = nock('https://api.turfgame.com', {
        'Content-Type': 'application/json'
      })
      .post('/v4/zones', JSON.stringify(criteria))
      .reply(404);

      turf.findZones(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockUsers.done();
        done();
      }, criteria);
    });

  });


  // -- getAllZones

  describe('getAllZones', function() {

    it('should expose a function getAllZones', function () {
      expect(turf.getAllZones).to.be.a('function');
    });

    it('should request /zones/all', function (done) {
      var nockAllZones = nock('https://api.turfgame.com')
        .get('/v4/zones/all')
        .reply(200, {});

      turf.getAllZones(function(err, data) {
        expect(err).to.be.null;
        expect(data).not.to.be.null;
        nockAllZones.done();
        done();
      });
    });

    it('should handle an error response from /zones/all', function(done) {
      var nockAllZones = nock('https://api.turfgame.com')
        .get('/v4/zones/all')
        .reply(404);

      turf.getAllZones(function(err, data) {
        expect(err).not.to.be.null;
        expect(data).to.be.null;
        nockAllZones.done();
        done();
      });
    });
  });

});
