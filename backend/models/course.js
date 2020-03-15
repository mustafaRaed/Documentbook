let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name: String,
    termin: Number,
    hp: Number
});

module.exports = mongoose.model('Course', courseSchema);