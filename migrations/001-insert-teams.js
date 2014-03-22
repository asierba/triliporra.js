var MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra',
    mongoClient = require('mongodb').MongoClient,
    format = require('util').format;

var generateTeams = function(names) {
    var teams = [];
    for (var i = 0; i < names.length; i++) {
        teams.push({name: names[i], points: 0, wins: 0});
    };
    return teams;
}

exports.up = function(next){
    var teamNames = ["Brazil",
        "Coratia", 
        "Mexico",
        "Cameroon",
        "Spain",
        "Netherlands",
        "Chile",
        "Australia",
        "Colombia",
        "Greece",
        "Ivory Coast",
        "Japan",
        "Uruguay",
        "Costa Rica",
        "England",
        "Italy",
        "Switzerland",
        "Ecuador",
        "France",
        "Honduras",
        "Argentina",
        "Bosnia and Herzegovina",
        "Iran",
        "Nigeria",
        "Germany",
        "Portugal",
        "Ghana",
        "USA",
        "Belgium",
        "Algeria",
        "Russia",
        "Korea Republic"
        ];

    var teams = generateTeams(teamNames);

    mongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;

        db.collection('teams').insert(teams, function() {
            next();
        });
    });
};

exports.down = function(next){
    mongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;

        db.collection('teams').remove({}, function() {
            next();
        });
    });
};
