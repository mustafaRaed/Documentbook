var express = require('express');
var userModel = require('../models/user');
var documentModel = require('../models/document');
var courseModel = require('../models/course');
require('./database');
var cors = require('cors')
var multer = require('multer')
const fs = require('fs')

var destFolder = './uploads/';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var uploadFolder = destFolder + req.body.courseName;
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
courseModel.countDocuments({}, (err, res) => {
    var courses = [{name: "OM066G Omvårdnad GR(A) Omvårdnadens kunskapsområde 7,5 hp", termin: 1, hp: 7.5},
        {name: "MV006G Medicinsk vetenskap GR(A) Anatomi och fysiologi 7,5 hp", termin: 1, hp: 7.5},
        {name: "OM067G Omvårdnad GR(A) Hälsa, miljö och omvårdnadshandlingar 15 hp", termin: 1, hp: 15},
        {name: "MV027G Medicinsk vetenskap GR(A) Mikrobiologi och farmakologi 7,5 hp", termin: 2, hp: 7.5},
        {name: "OM065G Omvårdnad GR(A) Hälsa och ohälsa I 7,5 hp", termin: 2, hp: 7.5},
        {name: "OM069G Omvårdnad GR(A) Allmän hälso- och sjukgård I (VFU) 7,5 hp", termin: 2, hp: 7.5},
        {name: "OM070G Omvårdnad GR(A) Hälsa och ohälsa II 7,5 hp", termin: 2, hp: 7.5},
        {name: "MV028G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom I 7,5 hp", termin: 3, hp: 7.5},
        {name: "OM068G Omvårdnad GR(B) Information och undervisning i omvårdnad I 7,5 hp", termin: 3, hp: 7.5},
        {name: "MV029G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom II 7,5 hp", termin: 3, hp: 7.5},
        {name: "OM071G Omvårdnad GR(B) Ledarskap och organisation av omvårdnadsarbete 7,5 hp", termin: 3, hp: 7.5},
        {name: "OM072G Omvårdnad GR(B) Allmän hälso- och sjukvård II (VFU) 15hp", termin: 4, hp: 15},
        {name: "MV030G Medicinsk vetanskap GR(B) Vård vid ohälsa och sjukdom III 7,5 hp", termin: 4, hp: 7.5},
        {name: "OM073G Omvårdnad GR(B) Hälsa och ohälsa III 7,5 hp", termin: 4, hp: 7.5},
        {name: "OM078G Omvårdnad GR(B) Allmän hälso- och sjukvård III (VFU) 15hp", termin: 5, hp: 15},
        {name: 'OM079G-OM081G Omvårdnad GR(C) Vetenskaplig metod 15 hp', termin: 5, hp: 15},
        {name: 'OM080G-OM08 Omvårdnad GR(C) Examensarbete (76-90 hp) 15hp', termin: 6, hp: 15},
        {name: "OM075G Omvårdnad GR(C) Allmän hälso- och sjukvård IV(VFU) 15 hp", termin: 6, hp: 15}];

    if (res === 0){
        courseModel.create(courses);
        fs.mkdirSync('./uploads', err => {});
        courses.map(course => fs.mkdirSync(destFolder + course.name, err => {}));
    }
})

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

server.get('/documents/:courseName', (req,res) => {
    documentModel.find({courseName: req.params.courseName})
        .then(documents => res.send(documents.reverse()));
})

server.get('/download-document/:courseName&:fileName', (req,res) => {
    res.download(destFolder + req.params.courseName + "/" + req.params.fileName)
})

server.get('/courses', (req,res) => {
    courseModel.aggregate([{$group: {_id: "$termin", objects: {$push: "$$ROOT"}}},
                                   {$sort: {"_id": 1}}]).then(courses => res.send(courses))
})