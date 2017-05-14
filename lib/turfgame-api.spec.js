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

  it('should expose a function getFeeds', function () {
    expect(turf.getFeeds).to.be.a('function');
  });

  describe('getFeeds', function() {

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
        expect(data).to.be.undefined;
        nockFeeds.done();
        done();
      });
    });

    xit('should support query parameter: afterDate');
    xit('should support filtering by feed types (takeover, medal, chat, zone)');
    xit('should support filtering by multiple feed types');

  });


  // -- getRegions

  it('should expose a function getRegions', function () {
    expect(turf.getRegions).to.be.a('function');
  });

  describe('getRegions', function () {

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
        expect(data).to.be.undefined;
        nockRegions.done();
        done();
      });
    });

  });


  // -- getRounds

  it('should expose a function getRounds', function () {
    expect(turf.getRounds).to.be.a('function');
  });

  describe('getRounds', function() {
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
        expect(data).to.be.undefined;
        nockRounds.done();
        done();
      });
    });
  });


  // -- getStatistics

  it('should expose a function getStatistics', function () {
    expect(turf.getStatistics).to.be.a('function');
  });

  describe('getStatistics', function() {
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
        expect(data).to.be.undefined;
        nockStats.done();
        done();
      });
    });
  });


  // -- findUsers

  it('should expose a function findUsers', function () {
    expect(turf.findUsers).to.be.a('function');
  });

  describe('findUsers', function() {
    xit('should post to /users');
    xit('should handle an error response from /users');
  });


  // -- getUsersLocation

  it('should expose a function getUsersLocation', function () {
    expect(turf.getUsersLocation).to.be.a('function');
  });

  describe('getUsersLocation', function() {
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
        expect(data).to.be.undefined;
        nockUserLoc.done();
        done();
      });
    });
  });


  // -- getTopUsers

  it('should expose a function getTopUsers', function () {
    expect(turf.getTopUsers).to.be.a('function');
  });

  describe('getTopUsers', function() {
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
        expect(data).to.be.undefined;
        nockUserTop.done();
        done();
      });
    });
  });


  // -- findTopUsers

  it('should expose a function findTopUsers', function () {
    expect(turf.findTopUsers).to.be.a('function');
  });

  describe('findTopUsers', function() {
    xit('should post to /users/top');
    xit('should handle error response from /users/top');
  });


  // -- findZones

  it('should expose a function findZones', function () {
    expect(turf.findZones).to.be.a('function');
  });

  describe('findZones', function() {
    xit('should post to /zones');
    xit('should handle error response from /zones');
  });


  // -- getAllZones

  it('should expose a function getAllZones', function () {
    expect(turf.getAllZones).to.be.a('function');
  });

  describe('getAllZones', function() {
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
        expect(data).to.be.undefined;
        nockAllZones.done();
        done();
      });
    });
  });

});
