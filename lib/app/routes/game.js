
var express = require('express');
var app = express.Router();

var Game = require('../../../models').Game;
var Pitcher = require('../../../models').Pitcher;

app.param('game_id', function(req, res, next, id) {
  Game.findById(id).then(function(game) {
    if (game) {
      req.game = game;
      next();
    } else {
      res.status(404).send('Game not found');
    }
  });
});

app.get('/:game_id', function(req, res) {
  res.render('game', { game: req.game });
});

app.get('/:game_id/update', function(req, res) {
  res.render('game/update', { game: req.game });
});


app.post('/:game_id/updated', function(req, res) {
  var pitcher_id = req.pitcher ? req.pitcher.id : null;
  if (!req.user) {
    res.status(401).send('You must be logged in.');
  } else {
      // Pitcher.findOne({where: {id: pitcher_id}}).then(function(pitcher) {
        req.game.update(req.body).then(function(game) {
          req.session.save(function() {
            res.render('updateGame', { game: game});
          });
        });
    // });
  }
});

module.exports = app;
