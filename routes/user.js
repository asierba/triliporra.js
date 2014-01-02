
/*
 * GET users listing.
 */

exports.list = function(req, res){
    var repository = require('../repository');

    repository.getAll('users', function (results) {
        res.render('user/list', {title: 'List of users', users: results});
    });
};


/*
 * GET user login screen.
 */

exports.login = function(req, res){
  res.render('user/login', {title: 'login'});
};
