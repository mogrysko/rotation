'use strict';

require('app-module-path').addPath(__dirname + '/../../');

// load the common test setup code
require('./setup');

// code to test
var app = require('lib/app');

// libraries
var request = require('supertest-as-promised').agent,
  agent;

var Game = require('../../models').Game;

describe('games', function() {
  beforeEach(function() {
    agent = request(app);
  });

  after(function() {
    return Pitcher.truncate();
  });

  describe('games', function() {
    it('should have an add game page', function() {
      return agent
        .get('/pitcher/1/game/create')
        .expect(200)
    });

    it('should add a game', function() {
      return agent
        .post('/pitcher/1/game/success')
        .type('form')
        .send({
          date: '04/04/2016',
          opponentcity: 'Texas',
          opponentname: 'Rangers',
          homeaway: 'home',
          tableau: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
          tableau2: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
          tableau3: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
          tableau4: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
          pitcher_id: '1'
        })
        .expect(302)
        .expect('Location', 'newGame')
        .then(function() {
          return agent
            .get('newGame')
            .expect(200);
          });
    });

    it('should allow user to edit game', function() {
      return agent
        .get('/game/1/update')
        .expect(200)
    });

    it('should update a game', function() {
        return agent
          .post('/game/1/updated')
          .type('form')
          .send({
            date: '04/04/2016',
            opponentcity: 'Texas',
            opponentname: 'Rangers',
            homeaway: 'away',
            tableau: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
            tableau2: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
            tableau3: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
            tableau4: 'https://public.tableau.com/views/Tillman4_04/Sheet2?:embed=y&:display_count=yes&:showTabs=y',
            pitcher_id: '1'
          })
          .expect(302)
          .expect('Location', 'updatedGame')
          .then(function() {
            return agent
              .get('updatedGame')
              .expect(200);
            });
      });
  });
});
