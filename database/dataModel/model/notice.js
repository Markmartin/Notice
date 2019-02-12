const Sequelize = require('sequelize');
const notice = {
    noticeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    account: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title_cn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    content_cn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    title_en: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    content_en: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    title_kn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    content_kn: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: Sequelize.DATE(6),
        allowNull: true,
        get() {
            if (Object.keys(this.dataValues).indexOf('createdAt') == -1) {
                return;
            }
            return this.dataValues.createdAt.toString();
        },
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE(6),
        allowNull: true,
        get() {
            if (Object.keys(this.dataValues).indexOf('updatedAt') == -1) {
                return;
            }
            return this.dataValues.updatedAt.toString();
        },
        defaultValue: Sequelize.NOW
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}
const structName = 'notice';

module.exports = {
    name: structName,
    struct: notice
};