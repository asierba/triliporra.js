/*
 * GET teams listing.
 */

exports.list = function(req, res){
	var mongoClient = require('mongodb').MongoClient,
	format = require('util').format;

    mongoClient.connect('mongodb://127.0.0.1:27017/triliporra', function(err, db) {
		if(err) throw err;

		var teams = db.collection('teams');
       
		teams.count(function(err, count) {			
			console.log(format("count = %s", count));
		});

		teams.find().toArray(function(err, results) {
			console.dir(results);
			db.close();

			res.render('team', {title: 'List of teams', teams: results});
		});
    });
};