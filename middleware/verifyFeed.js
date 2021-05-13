const db = require("../models");
const Feeds = db.feeds;

checkDuplicate = (req, res, next) => {

    if (!req.body.feedName) {
        res.status(400).send({
            message: "Failed! FeedName is required!"
        });
        return;
    }
    // Username
    Feeds.findOne({
        where: {
            feedName: req.body.feedName,
            isDeleted: false
        }
    }).then(feed => {
        if (feed) {
            res.status(400).send({
                message: "Failed! FeedName is already in use!"
            });
            return;
        }
        next();
    });
};

const verifyFeed = {
    checkDuplicate: checkDuplicate
};

module.exports = verifyFeed;