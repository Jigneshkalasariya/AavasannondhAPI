module.exports = (sequelize, Sequelize) => {
    const Template = sequelize.define("template", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
        },
        language: {
            type: Sequelize.STRING
        }
    });

    return Template;
};