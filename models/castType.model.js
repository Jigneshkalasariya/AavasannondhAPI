module.exports = (sequelize, Sequelize) => {
    const CastType = sequelize.define("casttypes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        createdBy:{
            type: Sequelize.INTEGER
        }
    });

    return CastType;
};