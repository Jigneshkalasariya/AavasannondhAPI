const db = require("../models");
const config = require("../config/auth.config");
const CastType = db.castType;
const Request = db.request;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.getCastTypeList = (req, res) => {
    CastType.findAll()
        .then(castTypes => {
           return  res.status(200).send({ data: castTypes });
         }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
};

exports.getCastTypes = (req, res) => {
    CastType.findAll()
        .then(castTypes => {
           return  res.status(200).send({ data: castTypes });
         }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
};

exports.addCastType = (req, res) => {
    CastType.create({
        name: req.body.name,
        isActive: 1,
        createdAt: Date.now(),
        createdBy:req.userId
    }).then(cast => {
            return res.status(200).send({ message: "Cast type was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateCastType = (req, res) => {
    CastType.update({
        name: req.body.name,
        updatedAt: Date.now()
    }, {
        where: { id: req.body.id }
    }).then(cast => {
           return res.status(200).send({ message: "Cast type was updated successfully!" });
       
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.deleteCastType = (req, res) => {
    CastType.update({
        isActive: 0,
        updatedAt: Date.now()
    }, {
        where: { id: req.query.Id }
    }).then(cast => {
        res.send({ message: "Cast type was deleted successfully!" });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}