let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name: String,
    termin: Number,
    hp: Number,
    positionInTermin: Number
});

module.exports = mongoose.model('Course', courseSchema);