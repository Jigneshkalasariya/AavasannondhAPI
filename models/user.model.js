module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phonenumber: {
            type: Sequelize.STRING
        },
        pictureName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        castId: {
            type: Sequelize.INTEGER
        },
        isPhoneVerified:{
            type: Sequelize.BOOLEAN
        },
        isAdmin:{
            type: Sequelize.BOOLEAN
        },
        fcmToken: {
            type: Sequelize.STRING
        },
        deviceId:{
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        createdBy:{
            type: Sequelize.INTEGER
        },
        isVerifyPin:{
            type: Sequelize.BOOLEAN
        },
        verifyPin: {
            type: Sequelize.STRING
        },
    });

    return User;
};