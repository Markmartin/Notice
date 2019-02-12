const sequelize = require('../database');
const noticeManager = require('./model/noticeManager');
const notice = require('./model/notice')

function registerStruct(name, struct) {
    const sequelizeConfig = {
        timestamps: false,
        freezeTableName: true
    }
    return sequelize.define(name, struct, sequelizeConfig)
}

const modelManager = {
    [noticeManager.name]: registerStruct(noticeManager.name, noticeManager.struct),
    [notice.name]: registerStruct(notice.name, notice.struct)
}

module.exports = modelManager;