
exports.list = function(req, res){
    var mongoose = require('mongoose'),
        Team = require('../models/team'),
        MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

    mongoose.connect(MONGOHQ_URL);
	Team.find({}, function(err, results) {
        mongoose.connection.close();	
		res.render('team/list', {title: 'List of teams', teams: results});
	});
};