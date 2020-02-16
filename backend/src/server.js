var express = require('express');
var userModel = require('../models/user');
require('./database');

const server = express();

server.listen(3000);

server.get('/',(req,res) => {
    userModel.find().then(users => res.send(users));
});

server.get('/create-user/:user_name', (req, res) => {
    new userModel({
        name: req.params.user_name,
    })
        .save()
        .then(() => res.redirect("/"));
});

server.get('/delete-user/:id', (req,res) => {
   userModel
       .remove({_id : req.params.id})
       .then(() => res.redirect("/"));
});

server.get('/update-user/:id&:userName', (req,res) => {
   userModel
       .update({_id : req.params.id}, {name : req.params.userName})
       .then(() => res.redirect("/"));
});