var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

exports.list = function(req, res) {
    mongoose.connect(MONGOHQ_URL);

    User.find({}).sort({points: -1}).exec(function(err, results) {
        mongoose.connection.close();
        res.render('user/list', {title: 'List of users', users: results});
    });
};

exports.show = function(req, res) {
    mongoose.connect(MONGOHQ_URL);

    User.find({ name: req.param('name') }, function(err, users) {
        mongoose.connection.close();

        if(users.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        var user = users[0];

        res.render('user/show', {title: user.name, user: user});
    });    
}

exports.login = function(req, res) {
    res.render('user/login', {title: 'login'});
};

exports.login_post = function(req, res) {
    mongoose.connect(MONGOHQ_URL);

    User.find({ name: req.body.username }, function(err, users) {
        mongoose.connection.close();

        if(users.length != 1) {
            res.redirect('/user/login');
            return;
        }

        var user = users[0];
        bcrypt.compare(req.body.password, user.password, function(err, match) {
            if(match)
                res.redirect('/user/' + user.name);
            else
                res.redirect('/user/login'); 
        });
    });    
}

exports.signup = function(req, res) {
    res.render('user/signup', {title: 'sign up'});
};

exports.signup_post = function(req, res) {
    var util = require('util'),        
        plainPassword = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(plainPassword, salt, function(err, hashPassword) {
            
            var user = new User({ 
                name: req.body.username, 
                password: hashPassword,
                email: req.body.email }); 

            mongoose.connect(MONGOHQ_URL);

            user.save(function(error, createdUser) {
                mongoose.connection.close();

                if (error) {
                    res.send('there have been validation errors: ' + util.inspect(error.errors), 400);
                    return;
                }

                res.redirect('/user/' + req.body.username);                
            });
        });
    });    
};
