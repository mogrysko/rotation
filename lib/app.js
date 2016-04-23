
require('app-module-path').addPath(__dirname + '../');

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require('connect-redis');

var app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

app.set('view engine', 'jade');
app.set('views', './views');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var RedisStore = redis(session);
app.use(session({
  secret: 'Shhhhh!',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ url: process.env.REDIS_URL || false })
}));

app.use(express.static('public'));

var User = require('../models').User;
app.use(function(request, response, next) {
  response.locals.isAuthenticated = request.isAuthenticated = function isAuthenticated() {
    return !!request.user;
  };
  if (request.session && request.session.user_id) {
    User.findById(request.session.user_id).then(function(user) {

      /* istanbul ignore else */
      if (user) {
        response.locals.user = request.user = user;
      }

      next();
    });
  } else {
    next();
  }
});

// var Rotation = require('../models').Rotation;
// app.use(function(request, response, next) {
//   response.locals.inRotation = request.inRotation = function inRotation() {
//     return !!request.rotation;
//   };
//   if (request.session && request.session.user_id) {
//     Rotation.findOne({where: {user_id: request.session.user_id}}).then(function(rotation) {
//
//       /* istanbul ignore else */
//       if (rotation !== 'NULL') {
//         response.locals.rotation = request.rotation = rotation;
//       }
//
//       next();
//     });
//   } else {
//     next();
//   }
// });



app.use(require('./app/routes'));
/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  require('express-debug')(app);
}

module.exports = app;
