let mongoose = require('mongoose');

let documentSchema = new mongoose.Schema({
    path: String,
    description: String,
    title: String,
    fileName: String,
    courseName: String
});

module.exports = mongoose.model('Document', documentSchema);