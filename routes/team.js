/*
 * GET teams listing.
 */

exports.list = function(req, res){
	var teams = [
		{
			name: "Brasil",
			points: 12,
			wins: 2
		},
		{
			name: "Spain",
			points: 10,
			wins: 1
		},
		{
			name: "France",
			points: 6,
			wins: 3
		}
	]
  	res.render('team', {title: 'List of teams', teams: teams});
};