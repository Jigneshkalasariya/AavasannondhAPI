const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};


verifyResetPasswordToken = (req, res, next) => {

    if (!req.body.token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(req.body.token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.email = decoded.email;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if(user.isAdmin){
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
};

const authJwt = {
    verifyToken: verifyToken,
    verifyResetPasswordToken: verifyResetPasswordToken,
    isAdmin: isAdmin
};
module.exports = authJwt;