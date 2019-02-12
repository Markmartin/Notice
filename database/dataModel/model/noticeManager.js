const Sequelize = require('sequelize');
const noticeManager = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secretKey: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
const structName = 'noticemanager';

module.exports = {
    name: structName,
    struct: noticeManager
};