
var express = require('express');
var app = express.Router();

var Pitcher = require('../../../models').Pitcher;
var Game = require('../../../models').Game;

app.param('pitcher_id', function(req, res, next, id) {
  Pitcher.findById(id).then(function(pitcher) {
    if (pitcher) {
      req.pitcher = pitcher;
      next();
    } else {
      res.status(404).send('Pitcher not found');
    }
  });
});

app.get('/:pitcher_id', function(req, res) {
  var pitcher_id = req.pitcher ? req.pitcher.id : null;
  Game.findAll( {where: { pitcher_id: pitcher_id }}).then(function(games) {
    res.render('pitcher', { pitcher: req.pitcher, games: games });
  });
  // res.render('pitcher', { pitcher: req.pitcher });
});

app.get('/:pitcher_id/game/create', function(req, res) {
  var pitcher_id = req.pitcher ? req.pitcher.id : null;
  Pitcher.findAll( {where: {id: pitcher_id}}).then(function(pitcher) {
    res.render('game/create', {pitcher: req.pitcher});
  });
});

app.post('/:pitcher_id/game/success', function(req, res) {
  if (!req.user) {
    res.status(401).send('You must be logged in.');
  } else {
      req.pitcher.createGame(req.body).then(function(game) {
        req.session.save(function() {
          res.render('newGame', { game: game });
        });
      });
    }
});









module.exports = app;
