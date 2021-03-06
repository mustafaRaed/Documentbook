let express = require('express');
let userModel = require('../models/user');
let documentModel = require('../models/document');
let courseModel = require('../models/course');
require('./database');
let cors = require('cors');
let multer = require('multer');
const fs = require('fs');
let destFolder = './uploads/';
let bodyparser = require('body-parser');
let rimraf = require('rimraf')

server = express();
server.use(bodyParser.json())

server.use(cors());

server.listen(9000);

const usersRouter = require('./users');

server.use('/users', usersRouter);

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let uploadFolder = destFolder + req.body.courseName;
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

courseModel.countDocuments({}, (err, res) => {
    var courses = [{name: "OM066G Omvårdnad GR(A) Omvårdnadens kunskapsområde 7,5 hp", termin: 1, hp: 7.5, positionInTermin: 1},
        {name: "MV006G Medicinsk vetenskap GR(A) Anatomi och fysiologi 7,5 hp", termin: 1, hp: 7.5, positionInTermin: 2},
        {name: "OM067G Omvårdnad GR(A) Hälsa, miljö och omvårdnadshandlingar 15 hp", termin: 1, hp: 15, positionInTermin: 3},
        {name: "MV027G Medicinsk vetenskap GR(A) Mikrobiologi och farmakologi 7,5 hp", termin: 2, hp: 7.5, positionInTermin: 1},
        {name: "OM065G Omvårdnad GR(A) Hälsa och ohälsa I 7,5 hp", termin: 2, hp: 7.5, positionInTermin: 2},
        {name: "OM069G Omvårdnad GR(A) Allmän hälso- och sjukgård I (VFU) 7,5 hp", termin: 2, hp: 7.5, positionInTermin: 3},
        {name: "OM070G Omvårdnad GR(A) Hälsa och ohälsa II 7,5 hp", termin: 2, hp: 7.5, positionInTermin: 4},
        {name: "MV028G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom I 7,5 hp", termin: 3, hp: 7.5, positionInTermin: 1},
        {name: "OM068G Omvårdnad GR(B) Information och undervisning i omvårdnad I 7,5 hp", termin: 3, hp: 7.5, positionInTermin: 2},
        {name: "MV029G Medicinsk vetenskap GR(B) Vård vid ohälsa och sjukdom II 7,5 hp", termin: 3, hp: 7.5, positionInTermin: 3},
        {name: "OM071G Omvårdnad GR(B) Ledarskap och organisation av omvårdnadsarbete 7,5 hp", termin: 3, hp: 7.5, positionInTermin: 4},
        {name: "OM072G Omvårdnad GR(B) Allmän hälso- och sjukvård II (VFU) 15hp", termin: 4, hp: 15, positionInTermin: 1},
        {name: "MV030G Medicinsk vetanskap GR(B) Vård vid ohälsa och sjukdom III 7,5 hp", termin: 4, hp: 7.5, positionInTermin: 2},
        {name: "OM073G Omvårdnad GR(B) Hälsa och ohälsa III 7,5 hp", termin: 4, hp: 7.5, positionInTermin: 3},
        {name: "OM078G Omvårdnad GR(B) Allmän hälso- och sjukvård III (VFU) 15hp", termin: 5, hp: 15, positionInTermin: 1},
        {name: 'OM079G-OM081G Omvårdnad GR(C) Vetenskaplig metod 15 hp', termin: 5, hp: 15, positionInTermin: 2},
        {name: 'OM080G-OM08 Omvårdnad GR(C) Examensarbete (76-90 hp) 15hp', termin: 6, hp: 15, positionInTermin: 1},
        {name: "OM075G Omvårdnad GR(C) Allmän hälso- och sjukvård IV(VFU) 15 hp", termin: 6, hp: 15, positionInTermin: 2}];

    if (res === 0){
        courseModel.create(courses);
        fs.mkdirSync('./uploads', err => {});
        courses.map(course => fs.mkdirSync(destFolder + course.name, err => {}));
    }
})

let upload = multer({ storage: storage });

server.post('/post-document', upload.single('document'),(req, res) => {
    //console.log(req.file);
    let file = req.file;
    let body = req.body;
    documentModel({
        fileName: file.originalname,
        courseName: body.courseName,
        path: destFolder + body.courseName + "/" + file.originalname,
        description: body.description,
        title: body.title
    }).save().then(() => res.redirect("/documents"))
});

server.get('/documents/:courseName', (req,res) => {
    documentModel.find({courseName: req.params.courseName})
        .then(documents => res.send(documents.reverse()));
});

server.get('/download-document/:courseName&:fileName', (req,res) => {
    res.download(destFolder + req.params.courseName + "/" + req.params.fileName)
});

server.get('/courses', (req,res) => {
    courseModel.aggregate([{$group: {_id: "$termin", objects: {$push: "$$ROOT"}}},
                                   {$sort: {"_id": 1}}]).then(courses => res.send(courses))
})

server.get('/courseInfo', (req,res) => {
    courseModel.find().then(courses => res.send(courses))
})

server.post('/update-course',(req,res) => {
    let updatedCourse = req.body.updatedCourse
    let originalCourse = req.body.originalCourse
    console.log(updatedCourse)
    if (originalCourse.name !== updatedCourse.name)
        fs.renameSync(destFolder+originalCourse.name, destFolder+updatedCourse.name, err => {console.log(err)})

    courseModel.updateOne({_id: updatedCourse._id}, updatedCourse)
        .then(e => console.log(e))
});

server.post('/add-course',(req,res) => {
    let newCourse = req.body.newCourse;
    console.log(newCourse);

    fs.mkdirSync(destFolder + newCourse.name, err => {});

    courseModel(newCourse).save()
});

server.post('/delete-course',(req,res) => {
    console.log(req.body)
    courseModel
        .deleteOne({_id : req.body._id})
        .then(e => rimraf.sync(destFolder + req.body.name))
});