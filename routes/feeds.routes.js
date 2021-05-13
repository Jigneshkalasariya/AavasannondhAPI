const { authJwt } = require("../middleware");
const controller = require("../controllers/feeds.controller");
const verifyFeed = require("../middleware/verifyFeed");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/feeds/searchFeeds", [
            authJwt.verifyToken
        ],
        controller.searchFeeds
    );

    app.post(
        "/api/feeds/feedList", [
            authJwt.verifyToken
        ],
        controller.feedList
    );

    app.post(
        "/api/feeds/addFeeds", [
            authJwt.verifyToken,
            verifyFeed.checkDuplicate,
        ],
        controller.addFeeds
    );

    app.get(
        "/api/feeds/getFeed", [
            authJwt.verifyToken
        ],
        controller.getFeed
    );

    app.post(
        "/api/getFeed/updateFeed", [
            authJwt.verifyToken
        ],
        controller.updateFeed
    );

    app.get(
        "/api/getFeed/deleteFeed", [
            authJwt.verifyToken
        ],
        controller.deleteFeed
    );
};