module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("feeds", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        feedName: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        castId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        village: {
            type: Sequelize.STRING
        },
        expireDate: {
            type: Sequelize.DATE
        },
        currentAddress: {
            type: Sequelize.STRING
        },
        villageAddress: {
            type: Sequelize.STRING
        },
        templateId: {
            type: Sequelize.INTEGER
        },
        pictureName: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        createdBy: {
            type: Sequelize.INTEGER
        },
        isActive: { 
            type: Sequelize.BOOLEAN 
        },
        isDeleted: {
            type: Sequelize.BOOLEAN
        },
        deletedAt: {
            type: Sequelize.DATE
        },
        deletedBy: {
            type: Sequelize.INTEGER
        }
    });

    return Product;
};