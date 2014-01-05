var mongoose = require('mongoose');
    
var userSchema = new mongoose.Schema({ 
    name : { type : String, validate: /\S+/, index : { unique : true } },
    points: { type: Number, default: 0, min: 0}
});

module.exports = mongoose.model('users', userSchema);
