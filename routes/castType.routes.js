const controller = require("../controllers/casttype.controller");
const verifyCastType = require("../middleware/verifyCastType");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/castType/getCastTypeList", [],
        controller.getCastTypeList
    );

    app.post(
        "/api/castType/addCastType", [
            authJwt.verifyToken,
            verifyCastType.checkDuplicate
        ],
        controller.addCastType
    );

    app.get(
        "/api/castType/getCastTypes", [
            authJwt.verifyToken],
        controller.getCastTypes
    );

    app.post(
        "/api/castType/updateCastType", [
            authJwt.verifyToken
        ],
        controller.updateCastType
    );

    app.get(
        "/api/castType/deleteCastType", [
            authJwt.verifyToken
        ],
        controller.deleteCastType
    );

};