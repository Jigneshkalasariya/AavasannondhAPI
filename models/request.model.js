module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        fromUserId: {
            type: Sequelize.INTEGER
        },
        toUserId: {
            type: Sequelize.INTEGER
        },
        requestedOn: {
            type: Sequelize.DATE
        },
        isAccepted: {
            type: Sequelize.BOOLEAN
        },
        acceptedOn: {
            type: Sequelize.DATE
        },
        isDecliened: {
            type: Sequelize.BOOLEAN
        },
        declienedOn: {
            type: Sequelize.DATE
        }
    });

    Request.associate = function(models) {
        Request.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'fromUser' })
        Request.belongsTo(models.User, { foreignKey: 'toUserId', as: 'toUser' })
    };

    return Request;
};