var mongoClient = require('mongodb').MongoClient,
        format = require('util').format,
        MONGOHQ_URL = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/triliporra';

exports.getAll = function (collection, callback) {
    mongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;

        var all = db.collection(collection);
       
        all.find().toArray(function(err, results) {
            db.close();
            callback(results);
        });
    });
};

exports.insert = function (collection, item, callback) {
    mongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;
        
        db.collection(collection).insert(item, function() {           
            db.close();
            callback(item._id);
        });        
    });
};
