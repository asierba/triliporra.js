exports.list = function(req, res){
    var repository = require('../repository');

    repository.getAll('users', function (results) {
        res.render('user/list', {title: 'List of users', users: results});
    });
};

exports.login = function(req, res){
  res.render('user/login', {title: 'login'});
};

exports.signup = function(req, res){
  res.render('user/signup', {title: 'sign up'});
};

exports.signup_post = function(req, res){
    var util = require('util');
    req.assert('email', 'required').notEmpty();

     var errors = req.validationErrors();
      if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
        return;
      }

    var repository = require('../repository'),
        user =  {
            name: req.body.username, 
            password: req.body.password, 
            email: req.body.email
        };

    repository.insert('users', user, function (id) {
        res.redirect('/user/' + id);
    });
};
