
/**
 * Module dependencies.
 */

var express = require('express');
var expressValidator = require('express-validator');
var routes = require('./routes');
var user = require('./routes/user');
var team = require('./routes/team');
var http = require('http');
var path = require('path');
var passport = require('passport');
var passport_config = require('./passport-config');

var app = express();


// all environments
app.use(express.bodyParser());
app.use(expressValidator());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', routes.index);

app.get('/users', user.list);
app.get('/user/login', user.login);
app.get('/user/signup', user.signup);
app.post('/user/signup', user.signup_post);

app.get('/teams', team.list);

passport_config.init(passport);

// Routes for passport
app.get('/user/login-google', passport.authenticate('google'));
app.get('/user/login-google-return', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login-error' }));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
