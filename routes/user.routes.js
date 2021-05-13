const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/user/searchUser", [
            authJwt.verifyToken
        ],
        controller.searchUser
    );

    app.get(
        "/api/user/getUserById", [
            authJwt.verifyToken
        ],
        controller.getUserById
    );

};