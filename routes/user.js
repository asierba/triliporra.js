var mongoose = require('mongoose'),
        User = require('../models/user'),
        MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

exports.list = function(req, res){
        mongoose.connect(MONGOHQ_URL);

        User.find({}, function(err, results) {
            mongoose.connection.close();
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

    var user = new User({ 
            name: req.body.username, 
            password: req.body.password, 
            email: req.body.email }); 

    mongoose.connect(MONGOHQ_URL);

    user.save(function(error, createdUser) {
        mongoose.connection.close();

        if (error) {
            res.send('there have been validation errors: ' + util.inspect(error.errors), 400);
            return;
        }    


        res.redirect('/user/');
    });
};
