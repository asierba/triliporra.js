/*
 * GET teams listing.
 */

exports.list = function(req, res){
	var mongoClient = require('mongodb').MongoClient,
		format = require('util').format,
		MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

    mongoClient.connect(MONGOHQ_URL, function(err, db) {
		if(err) throw err;

		var teams = db.collection('teams');
       
		teams.find().toArray(function(err, results) {
			db.close();
			res.render('team', {title: 'List of teams', teams: results});
		});
    });
};