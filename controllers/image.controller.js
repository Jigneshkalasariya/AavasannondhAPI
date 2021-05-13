const moment = require('moment');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Images = db.images;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const fs = require("fs");

exports.saveImages = (req, res) => {
    // Images Save
    if (req.body && req.body.images && req.body.images.length > 0) {
        var promises = [];
        req.body.images.forEach(element => {
            if (element.img) {
                const ts_hms = new Date();
                const fileName = moment(ts_hms).format("yyyyMMddHHmmssSSS");
                var base64Image = element.img.split(';base64,').pop();
                var dir = 'images/' + req.userId;
                const filename = fileName + '.png'
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                fs.writeFile(dir + "/" + filename, base64Image, { encoding: 'base64' }, function (err) {
                    console.log(err);
                });
                promises.push(new Promise((resolve, reject) => {
                    return Images.create({
                        name: filename,
                        createdby: req.userId,
                        createdAt: Date.now()
                    })
                        .then(objRequest => {
                            return resolve(objRequest);
                        })
                        .catch(err => {
                            return res.status(500).send({ message: err.message });
                        });
                }))
            }
        });
        Promise.all(promises).then(values => {
            res.status(200).send({message: "Image uploaded successfully!",  data: values });
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });;
    }
};