
/*
 * GET users listing.
 */

exports.list = function(req, res){
    var mongoClient = require('mongodb').MongoClient,
        format = require('util').format,
        MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

    mongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;

        var users = db.collection('users');
       
        users.find().toArray(function(err, results) {
            db.close();
            res.render('user/list', {title: 'List of users', users: results});
        });
    });
};


/*
 * GET user login screen.
 */

exports.login = function(req, res){
  res.render('user/login', {title: 'login'});
};
