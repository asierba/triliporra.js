var mongoose = require('mongoose');
    
var schema = new mongoose.Schema({ 
    name : { type : String, validate: /\S+/, unique: true },
    points: { type: Number},
    wins: { type: Number},
});

module.exports = mongoose.model('teams', schema);
