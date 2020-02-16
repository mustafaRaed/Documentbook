let mongoose = require('mongoose');
let validator = require('validator');

let userSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('User', userSchema);