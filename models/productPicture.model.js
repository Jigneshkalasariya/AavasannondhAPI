module.exports = (sequelize, Sequelize) => {
    const ProductPicture = sequelize.define("productpicture", {
        pictureName: {
            type: Sequelize.STRING
        },
        isDefault: {
            type: Sequelize.BOOLEAN
        },
        prodctId: {
            type: Sequelize.INTEGER
        }
    });

    return ProductPicture;
};