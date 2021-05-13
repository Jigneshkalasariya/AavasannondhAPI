const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );
    app.post("/api/auth/verifyPin", controller.verifyPin);
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/adminLogin", controller.adminLogin);
    app.post("/api/auth/sendResetEmail", controller.sendResetEmail);

    app.post(
        "/api/auth/resetPassword", [
            authJwt.verifyResetPasswordToken
        ],
        controller.resetPassword
    );
};