describe("MongoDB", function() {
    it("is there a server running", function() {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://127.0.0.1:27017/fastdelivery', function(err, db) {
            expect(err).toBe(null);
            db.close();            
        });
    });

    it("there are teams in the database", function() {   	
    	var MongoClient = require('mongodb').MongoClient
    	, format = require('util').format;
        MongoClient.connect('mongodb://127.0.0.1:27017/triliporra', function(err, db) {
			if(err) throw err;

			var teams = db.collection('teams');
           
			teams.count(function(err, count) {			
				console.log(format("count = %s", count));
			});

			teams.find().toArray(function(err, results) {
				console.dir(results);
				db.close();
			});
        });
    });

    xit("insert test", function () {
    	var MongoClient = require('mongodb').MongoClient
	    , format = require('util').format;

	  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	    if(err) throw err;

	    var collection = db.collection('test_insert');
	    collection.insert({a:2}, function(err, docs) {

	      collection.count(function(err, count) {
	        console.log(format("count = %s", count));
	      });

	      // Locate all the entries using find
	      collection.find().toArray(function(err, results) {
	        console.dir(results);
	        // Let's close the db
	        db.close();
	      });
	    });
	  })
    })
});

