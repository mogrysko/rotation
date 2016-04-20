
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

module.exports = app;
