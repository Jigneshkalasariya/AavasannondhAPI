const db = require("../models");
const config = require("../config/auth.config");
const mainconfig = require("../config/config");
const nodemailer = require('nodemailer');
const User = db.user;
const CastType = db.CastType;
var admin = require("firebase-admin");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    const verifyPin = randomString(6);

    User.create({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: req.body.isAdmin,
        castId: req.body.castId,
        verifyPin: verifyPin,
        isPhoneVerified: req.body.isPhoneVerified,
        isVerifyPin: false,
        fcmToken: req.body.fcmToken
    })
        .then(user => {
            const callbackUrl = `<p>Verify PIN is "${verifyPin}"</p>`;
            var message = {
                notification: {
                    title: "Avasan Nondh",
                    body: `Registartion successfully, Verify PIN is "${verifyPin}"`
                  },
                  data:{verifyPin:verifyPin},
                token: req.body.fcmToken
              };
              sendnotification(message);
            // let mailTransporter = nodemailer.createTransport({
            //     service: 'Gmail',
            //     auth: {
            //         user: mainconfig.GMAIL_USER,
            //         pass: mainconfig.GMAIL_PASS
            //     },
            //     tls: {
            //         rejectUnauthorized: false
            //     }
            // });

            // let mailDetails = {
            //     from: mainconfig.GMAIL_USER,
            //     to: user.email,
            //     subject: 'Avasan Nondh: Verify PIN',
            //     html: callbackUrl
            // };

            // mailTransporter.sendMail(mailDetails, function (err, data) {
            //     if (err) {
                 return  res.status(200).send({data: {userId: user.id} , message: 'Users was reistered and verify pin Sent Successfully on register email!' });
            //     } else {
            //         res.status(200).send({data: {userId: user.id} , message: 'Users was reistered and verify pin Sent Successfully on register email!' });
            //     }
            // });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.verifyPin = (req, res) => {
    if(!req.body.verifyPin){
        return res.status(404).send({ message: "Verify Pin Not found." });
    }
    User.findOne({
        where: {
            id: req.body.id,
            verifyPin : req.body.verifyPin
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User or verify pin is not valid." });
            }

            User.update({
                isVerifyPin: 1
            }, {
                where: { id: user.id }
            }).then(data => {
    
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: config.expireTime
                });
    
                return res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    accessToken: token,
                    castId: user.castId,
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            isVerifyPin: 1
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found or not verify please check with administrator." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.expireTime
            });

            User.update({
                fcmToken: req.body.fcmToken,
            }, {
                where: { id:  user.id }
            }).then(userResponse => {
                   

            return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                castId: user.castId,
                accessToken: token
            });
        }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.adminLogin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            isVerifyPin: 1,
            isAdmin: 1
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found or not verify please check with administrator." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.expireTime
            });

            return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                castId: user.castId,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.sendResetEmail = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const newPassword = randomString(10);

            User.update({
                password: bcrypt.hashSync(newPassword, 8)
            }, {
                where: { id: user.id }
            }).then(data => {
                const callbackUrl = `<p>New Password is "${newPassword}"</p>`;

            let mailTransporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: mainconfig.GMAIL_USER,
                    pass: mainconfig.GMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            let mailDetails = {
                from: mainconfig.GMAIL_USER,
                to: user.email,
                subject: 'Reset Password',
                html: callbackUrl
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    res.status(500).send({ message: err.message });
                } else {
                    res.status(200).send({ message: 'Password updated and new password Sent Successfully on register email!' });
                }
            });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.resetPassword = (req, res) => {
    if (req.email) {
        User.findOne({
            where: {
                email: req.email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                User.update({
                    password: bcrypt.hashSync(req.body.password, 8)
                }, {
                    where: { id: user.id }
                }).then(data => {
                    res.status(200).send({ message: 'Password updated successfully!' });
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else {
        return res.status(404).send({ message: "User Not found." });
    }

};

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

function sendnotification(message){ 
    admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}