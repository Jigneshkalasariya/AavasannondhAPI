const db = require("../models");
const CastType = db.castType;

checkDuplicate = (req, res, next) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Failed! Cast type is required!"
        });
        return;
    }
    // Username
    CastType.findOne({
        where: {
            name: req.body.name,
            isActive: true
        }
    }).then(cast => {
        if (cast) {
            res.status(400).send({
                message: "Failed! Cast type is already in use!"
            });
            return;
        }
        next();
    });
};

const verifyCastType = {
    checkDuplicate: checkDuplicate
};

module.exports = verifyCastType;