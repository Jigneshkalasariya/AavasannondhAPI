const { authJwt } = require("../middleware");
const controller = require("../controllers/image.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/image/saveImages", [
            authJwt.verifyToken
        ],
        controller.saveImages
    );

};