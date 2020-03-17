const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
let User = require('../models/user');
var salt = bcrypt.genSaltSync(10);



router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.sendStatus(400).json('Error: ' + err));
});

router.route('/add').post(async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);
    const isAdmin = true;
    const newUser = new User({
        name,
        email,
        password,
        isAdmin,
    });

    const token = await jwt.sign({
        _id: newUser.password,
    }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.sendStatus(400).json('Error: ' + err));

    // TODO: Change url to the right url
    const url = `http://localhost:3000/ChangePassword/${token}`;
    const output = `
        <p>Ett nytt konto har skapats</p>
        <ul>
            <li>Användarnamn: ${email}</li>
            <li>Lösenord: ${req.body.password}</li>
        </ul>
        <p>För att bekräfta ditt konto och skapa ett eget lösenord, vänligen gå till: <a href="${url}">${url}</a></p>
    `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_FROM, // generated ethereal user
            pass: process.env.EMAIL_PASS // generated ethereal password
        }
    });

    // send mail with defined transport object
    const mailOptions = {
        from: '"Admin" <noreply@oursite.com>', // sender address
        to: email, // list of receivers
        subject: "Nytt användarkonto", // Subject line
        html: output // html body
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
        }else {
            console.log("Email sent " + info.response);
        }
    });

});

router.route('/login').post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email: email}, function(err, user) {
        if(err) {
            console.log(err);
            return res.sendStatus(500).json('Error: ' + err);
        }
        if(!user) {
            return res.sendStatus(404).json('Error: ' + err);
        }
        if(user)
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    console.log("user logged in")
                    return res.status(200).send(user.isAdmin);
                }
                else {
                    console.log("password is wrong")
                    return res.sendStatus(400).json(err);
                }
            })
    });
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.sendStatus(400).json('Error: ' +err));
});

router.route('/updatePassword/').post(async(req, res) => {
    let email = req.body.email;
    let token = req.body.token;
    let password = bcrypt.hashSync(req.body.password, salt);
    let newPassword = bcrypt.hashSync(req.body.newPassword, salt);
    console.log("Email: " + token);
    try{
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(verifyToken) {
            User.findOneAndUpdate({email: email}, {password: password}, {new: true, useFindAndModify: false}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (!user) {
                    return res.sendStatus(404);
                }
                if (user) {
                    user.password = newPassword;
                    user.save(function (err, user) {
                        if (err) {
                            res.send("Error: ", err);
                        } else {
                            return res.sendStatus(200);
                        }
                    });
                }

            });
    }
    }catch(err) {
        console.log("Error: " + err);
        return false;
    }
});

router.route('/updateUser/').post(async(req, res) => {
    let userName = req.body.name;
    let newUserName = req.body.editUser;
    let email = req.body.email;
    let newEmail = req.body.editEmail;
    try{
            User.findOneAndUpdate({name: userName}, {email: email}, {new: true, useFindAndModify: false}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                if (!user) {
                    return res.sendStatus(404);
                }
                if (user) {
                    user.name = newUserName;
                    user.email = newEmail;
                    user.save(function (err, user) {
                        if (err) {
                            res.send("Error: ", err);
                        } else {
                            return res.sendStatus(200);
                        }
                    });
                }

            });
    }catch(err) {
        console.log("Error: " + err);
        return false;
    }
});




router.route('/reset').post(async(req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);

    const token = await jwt.sign({
        _id: newUser.password,
    }, process.env.JWT_SECRET_KEY, {expiresIn: 60*10});

    User.findOne({email: email}, function(err, user){
        if(err) {
            return res.sendStatus(500);
        }
        if(user) {
            const url = `http://localhost:3000/ChangePassword/${token}`;
            const output = `
        <p>Lösenord återställt</p>
        <ul>
            <li>Användarnamn: ${email}</li>
            <li>Tillfälligt lösenord: ${req.body.password}</li>
        </ul>
        <p>En förfrågan om att återställa ditt lösenord har skapats. För att skapa ett nytt lösenord, vänligen gå till: <a href="${url}">${url}</a></p>
    `;

            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_FROM, // generated ethereal user
                    pass: process.env.EMAIL_PASS // generated ethereal password
                }
            });

            // send mail with defined transport object
            const mailOptions = {
                from: '"Admin" <noreply@oursite.com>', // sender address
                to: email, // list of receivers
                subject: "Återställ lösenord", // Subject line
                html: output // html body
            };


            transporter.sendMail(mailOptions, function(error, info) {
                if(error) {
                    console.log(error);
                }else {
                    console.log("Email sent " + info.response);
                }
            });
        }
    });
});


module.exports = router;