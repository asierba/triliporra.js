
/*
 * GET teams listing.
 */

exports.list = function(req, res){
	var repository = require('../repository');

	repository.getAll('teams', function (results) {			
		res.render('team/list', {title: 'List of teams', teams: results});
	});
};