
var express = require('express');
var app = express.Router();

var Rotation = require('../../models').Rotation;

app.get('/', function(req, res) {
  var user_id = req.user ? req.user.id : null;
  Rotation.findAll({where: {user_id: user_id}}).then(function(rotations) {
    res.render('index', { rotations: rotations });
  });
});

app.use('/user', require('./routes/user'));
app.use('/hello', require('./routes/hello'));
app.use('/rotation', require('./routes/rotation'));
app.use('/pitcher', require('./routes/pitcher'));
app.use('/game', require('./routes/game'));

module.exports = app;
