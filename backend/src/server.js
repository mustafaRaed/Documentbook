var express = require('express');
var userModel = require('../models/user');
var documentModel = require('../models/document');
require('./database');
var cors = require('cors')
var multer = require('multer')
const fs = require('fs')

var destFolder = './uploads/';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var uploadFolder = destFolder + req.body.courseName
        fs.stat(uploadFolder, (err, stats) => {
            if (stats === undefined){
                fs.mkdir(uploadFolder, (err) => {})
            }
            cb(null, uploadFolder);
        })
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ storage: storage })

server = express();

server.use(cors())

server.listen(9000);

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

server.post('/post-document', upload.single('document'),(req, res) => {
    //console.log(req.file);
    var file = req.file;
    var body = req.body;
    documentModel({
        fileName: file.originalname,
        courseName: body.courseName,
        path: destFolder + body.courseName + "/" + file.originalname,
        description: body.description,
        title: body.title
    }).save().then(() => res.redirect("/documents"))
})

server.get('/documents', (req,res) => {
    documentModel.find()
        .then(documents => res.send(documents.reverse()));
})

server.get('/download-document/:courseName&:fileName', (req,res) => {
    res.download(destFolder + req.params.courseName + "/" + req.params.fileName)
})