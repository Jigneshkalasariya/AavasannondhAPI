const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Request = db.request;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.searchUser = (req, res) => {
    //Search User to Database
    sequelize.query("Call sproc_searchUser (:search, :searchUserId)", { replacements: { search: req.body.search, searchUserId: req.userId }, type: sequelize.QueryTypes.SELECT })
        .then(users => {
            res.status(200).send({ data: users[0] });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.getUserById = (req, res) => {
    //Get User to Database
    User.findOne({
            where: {
                id: req.query.userId
            },
            attributes: ['id', 'firstname', 'lastname', 'email', 'avatar']
        }).then(users => {
            Request.findOne({
                    where: {
                        fromUserId: req.userId,
                        toUserId: req.query.userId
                    }
                }).then(objRequest => {
                    let objResult = {};
                    if (objRequest) {
                        objResult.isRequested = true;
                        objResult.isAccepted = objRequest.isAccepted;
                        objResult.isDecliened = objRequest.isDecliened;
                    }
                    res.status(200).send({ data: users, RequestDetail: objResult });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};