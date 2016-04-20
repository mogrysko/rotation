
var express = require('express');
var app = express.Router();

var Rotation = require('../../../models').Rotation;
var Pitcher = require('../../../models').Pitcher;

app.param('rotation_id', function(req, res, next, id) {
  Rotation.findById(id).then(function(rotation) {
    if (rotation) {
      req.rotation = rotation;
      next();
    } else {
      res.status(404).send('Rotation not found');
    }
  });
});

app.get('/create', function(req, res) {
  res.render('rotation/create');
});

app.post('/success', function(req, res) {
  if (!req.user) {
    response.status(401).send('You must be logged in.');
  } else {
      Rotation.findOne({ where: { team: req.body.team }})
        .then(function(existingRotation) {
          if (existingRotation) {
            res.end('Rotation already exists');
          } else {
            req.user.createRotation(req.body).then(function(rotation) {
              req.session.save(function() {
                res.render('newRotation', { rotation: rotation });
              });
            });
          }
        });
      }
});


app.get('/:rotation_id', function(req, res) {
  var rotation_id = req.rotation ? req.rotation.id : null;
  Pitcher.findAll( {where: { rotation_id: rotation_id }}).then(function(pitchers) {
    res.render('rotation', { rotation: req.rotation, pitchers: pitchers });
  });
});


// pitcher

app.get('/:rotation_id/pitcher/create', function(req, res) {
  var rotation_id = req.rotation ? req.rotation.id : null;
  Rotation.findAll( {where: {id: rotation_id}}).then(function(rotation) {
    res.render('pitcher/create', {rotation: req.rotation});
  });
});

app.post('/:rotation_id/pitcher/success', function(req, res) {
  if (!req.user) {
    res.status(401).send('You must be logged in.');
  } else {
      req.rotation.createPitcher(req.body).then(function(pitcher) {
        req.session.save(function() {
          res.render('newPitcher', { pitcher: pitcher });
        });
      });
    }
});


module.exports = app;
