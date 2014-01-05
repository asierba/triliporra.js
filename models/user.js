var mongoose = require('mongoose');
    
var userSchema = new mongoose.Schema({ 
    name : { type : String, validate: /\S+/, unique: true },
    points: { type: Number, default: 0, min: 0},
    email: { type: String, validate:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, unique: true},
    password: { type: String, validate: /\S+/}
});

module.exports = mongoose.model('users', userSchema);
