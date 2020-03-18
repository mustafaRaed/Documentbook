let mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/local';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.once('open', _ => {console.log("Database connected: ", url)});

db.on('error', err => { console.log("Connection error: ", err)});