'use strict';

require('app-module-path').addPath(__dirname + '/../../');

// load the common test setup code
require('./setup');

// code to test
var app = require('lib/app');

// libraries
var request = require('supertest-as-promised').agent,
  agent;

var Pitcher = require('../../models').Pitcher;

describe('pitchers', function() {
  beforeEach(function() {
    agent = request(app);
  });

  after(function() {
    return Pitcher.truncate();
  });

  describe('pitchers', function() {
    it('should have an add picther page', function() {
      return agent
        .get('/rotation/pitcher/create')
        .expect(200)
    });

    it('should add a pitcher', function() {
      return agent
        .post('/rotation/pitcher/success')
        .type('form')
        .send({
          firstname: 'pitcherfirstname',
          lastname: 'pitcherlastname',
          number: '30',
          playercity: 'pitcherplayercity',
          playerteam: 'pitcherplayerteam',
          playeryear: 'pitcherplayeryear',
          picture: 'https://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/1/1d74fe2c_mlbam.jpg',
          profile: 'http://widgets.sports-reference.com/wg.fcgi?css=1&site=br&url=%2Fplayers%2Ft%2Ftillmch01.shtml&div_pitching_value',
          seasonstats: 'http://widgets.sports-reference.com/wg.fcgi?css=1&site=br&url=%2Fplayers%2Fgl.cgi%3Fid%3Dtillmch01%26t%3Dp%26year%3D2016&div=div_pitching_gamelogs',
          rotation_id: '1'
        })
        .expect(302)
        .expect('Location', 'newPitcher')
        .then(function() {
          return agent
            .get('newPitcher')
            .expect(200);
          });
    });

    it('should allow user to edit pitcher', function() {
      return agent
        .get('/pitcher/1/update')
        .expect(200)
    });

    it('should update pitcher', function() {
      return agent
        .post('/pitcher/1/updated')
        .type('form')
        .send({
          firstname: 'pitcherfirstname',
          lastname: 'pitcherlastname',
          number: '30',
          playercity: 'pitcherplayercity2',
          playerteam: 'pitcherplayerteam2',
          playeryear: 'pitcherplayeryear2',
          picture: 'https://d3k2oh6evki4b7.cloudfront.net/req/201604090/images/headshots/1/1d74fe2c_mlbam.jpg',
          profile: 'http://widgets.sports-reference.com/wg.fcgi?css=1&site=br&url=%2Fplayers%2Ft%2Ftillmch01.shtml&div_pitching_value',
          seasonstats: 'http://widgets.sports-reference.com/wg.fcgi?css=1&site=br&url=%2Fplayers%2Fgl.cgi%3Fid%3Dtillmch01%26t%3Dp%26year%3D2016&div=div_pitching_gamelogs',
          rotation_id: '1'
        })
        .expect(302)
        .expect('Location', 'updatePitcher')
        .then(function() {
          return agent
            .get('updatePitcher')
            .expect(200);
          });
    });
  });
});
