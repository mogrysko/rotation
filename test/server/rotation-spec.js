'use strict';

require('app-module-path').addPath(__dirname + '/../../');

// load the common test setup code
require('./setup');

// code to test
var app = require('lib/app');

// libraries
var request = require('supertest-as-promised').agent,
  agent;

var Rotation = require('../../models').Rotation;
var User = require('../../models').User;
//

describe('rotation', function() {
  beforeEach(function() {
    agent = request(app);
  });

  describe('for a logged in user', function() {
    var user;
    beforeEach(function() {
      return User.create({ username: 'myNewUsername', password: 'myFancyPassword' })
        .then(function(_user_) {
          user = _user_;
          return agent
            .post('/users/login')
            .send({ username: 'myNewUsername', password: 'myFancyPassword' });
        })
    });

    it('should allow the creation of a rotation', function() {
        return agent
          .post('/rotation/create')
          .type('form')
          .send({
            team: '2016 rotation'
          })
          .expect(302)
          .expect('Location', 'newRotation')
          .then(function() {
            return agent
              .get('newRotation')
              .expect(200);
            });
      });
  });
});
