const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');
var salt = bcrypt.genSaltSync(10);

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('ERror: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);
    const isAdmin = false;
    const newUser = new User({
        name,
        email,
        password,
        isAdmin,
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    const url = `http://localhost:3000/ChangePassword/${email}`;
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
            user: "fogelstrme@gmail.com", // generated ethereal user
            pass: "ped(bankEr" // generated ethereal password
        }
    });

    // send mail with defined transport object
    const mailOptions = {
        from: '"Admin" <noreply@oursite.com>', // sender address
        to: email, // list of receivers
        subject: "Nytt användarkonto", // Subject line
        text: "Hello world?", // plain text body
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
    console.log("Email: " + email + " password: " + password);
    User.findOne({email: email}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        if(!user) {
            return res.status(404).send();
        }
        if(user)
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    console.log("user logged in");
                    return res.status(200).send();
                }
                else {
                    console.log("wrong password");
                    return res.status(400).json(err);
                }
            })
    });
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/updatePassword/').post((req, res) => {
    console.log("inside updatePassword " + req.body.newPassword);
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, salt);
    let newPassword = bcrypt.hashSync(req.body.newPassword, salt);;
    console.log("Email: " + email);
    User.findOneAndUpdate({email: email},{password: password}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        if(!user) {
            return res.status(404).send();
        }
        if(user) {
            user.password = newPassword;
            user.save(function (err, user) {
                if(err) {
                    res.send("Error: ", err);
                }else {
                    return res.send(200);
                }
            });
        }

    });
});

router.route('/reset').post((req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt);

    User.findOne({email: email}, function(err, user){
        if(err) {
            return res.status(500).send();
        }
        if(user) {
            const url = `http://localhost:3000/ChangePassword/${email}`;
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
                    user: "fogelstrme@gmail.com", // generated ethereal user
                    pass: "ped(bankEr" // generated ethereal password
                }
            });

            // send mail with defined transport object
            const mailOptions = {
                from: '"Admin" <noreply@oursite.com>', // sender address
                to: email, // list of receivers
                subject: "Återställ lösenord", // Subject line
                text: "Hello world?", // plain text body
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