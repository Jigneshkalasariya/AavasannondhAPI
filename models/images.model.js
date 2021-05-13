module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        createdby : {
            type: Sequelize.INTEGER
        },
        createdAt : {
            type: Sequelize.DATE
        }
    });

    return Images;
};