
var express = require('express');

var app = express.Router();

// Rotation.findOne({ where: { : req.body.username }})
//   .then(function(existingUser) {
//     if (existingUser) {
//       res.end('User already exists');
//     } else {
//       User.create(req.body).then(function(user) {
//         req.session.user_id = user.id;
//         req.session.save(function() {
//           res.redirect('/');
//         });
//       });
//     }
//   });

app.get('/', function(req, res) {
  res.end('');
});

app.get('/:name', function(req, res) {
  res.end('Hello ' + req.params.name);
});

module.exports = app;
