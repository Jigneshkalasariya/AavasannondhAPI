const db = require("../models");
const moment = require('moment');
const User = db.user;
const feeds = db.feeds;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
var admin = require("firebase-admin");
var APIUrl = "http://avasannondhapp-env.eba-tmshrqpm.us-east-2.elasticbeanstalk.com/images"

exports.searchFeeds = (req, res) => {
    //Search Product to Database
    sequelize.query("Call sproc_searchFeed (:search, :startDate, :endDate, :pageNumber, :pageSize, :searchUserId)", { replacements: { search: req.body.search, startDate: req.body.startDate, endDate:req.body.endDate, pageNumber: req.body.pageNumber, pageSize: req.body.pageSize, searchUserId: req.userId }, type: sequelize.QueryTypes.SELECT })
        .then(feeds => {
            let feedList = Object.values(feeds[1]);
            feedList.forEach(el => {
                el.image = `${APIUrl}/${el.pictureName}`;
            });
            res.status(200).send({ data: {total: feeds[0][0], list:feedList}});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.feedList = (req, res) => {
    //Search User to Database
    sequelize.query("Call sproc_feedList (:search)", { replacements: { search: req.body.search}, type: sequelize.QueryTypes.SELECT })
        .then(feeds => {
            res.status(200).send({ data: feeds[0] });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.addFeeds = (req, res) => {
    feeds.create({
        feedName: req.body.feedName,
        castId: req.body.castId,
        name: req.body.name,
        village: req.body.village,
        expireDate: req.body.expireDate,
        currentAddress: req.body.currentAddress,
        villageAddress: req.body.villageAddress,
        templateId: req.body.templateId,
        pictureName: req.body.pictureName,
        createdAt: Date.now(),
        createdBy:req.userId,
        userId: req.userId
    }).then(feed => {
            User.findAll({
                where:{
                    fcmToken: { [Op.not] : null}
                },attributes: ['fcmToken']
            }).then(list => {
                var message = {
                    notification: {
                        title: "New Feed Added",
                        body: req.body.feedName
                      },
                      tokens: list.map(token => token.fcmToken)
                  };
                  sendNotification(message);
                return res.status(200).send({ message: "Feed was added successfully!" });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.getFeed = (req, res) => {
    feeds.findOne({
        where: {
            id: req.query.feedId,
            isDeleted: false
        }
    })
        .then(feed => {
            res.status(200).send({ data: feed });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateFeed = (req, res) => {
    feeds.update({
        feedName: req.body.feedName,
        castId: req.body.castId,
        name: req.body.name,
        village: req.body.village,
        expireDate: req.body.expireDate,
        currentAddress: req.body.currentAddress,
        villageAddress: req.body.villageAddress,
        templateId: req.body.templateId,
        pictureName: req.body.pictureName,
        updatedAt: Date.now()
    }, {
        where: { id: req.body.id }
    }).then(feed => {
           return res.status(200).send({ message: "Feed was updated successfully!" });
       
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.deleteFeed = (req, res) => {
    feeds.update({
        isDeleted: 1,
        deletedAt: Date.now(),
        deletedBy: req.userId
    }, {
        where: { id: req.query.feedId }
    }).then(feed => {
        res.send({ message: "Feed was deleted successfully!" });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

function sendNotification(message){
    admin.messaging().sendMulticast(message)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}