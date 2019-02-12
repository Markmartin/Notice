const moment = require('moment')
const now = moment().format('YYYY-MM-DD');
const model = require('../dataModel')
const sequelize = require('../../database')
const jsonTool = require('../../../tools/jsonTool')
const code = require('../../../config/code')
const databaseCode = require('../../../config/databaseCode')
const paramValidation = require('../../../tools/paramValidation')
const noticeStruct = require('../model/notice').struct




async function insert_notice(account, noticeParam) {
    if (Object.keys(noticeParam).length <= 0) {
        return jsonTool.codeJson(code.notice_empty_code)
    }
    //检验参数有效性
    var validationParam = paramValidation.objectParamKeyValidation(noticeParam, Object.keys(noticeStruct), 2)
    if (validationParam == false) {
        return jsonTool.codeJson(code.notice_format_error_code)
    }

    try {
        var realParam = noticeParam;
        realParam.account = account;
        var insert_notice = await model.notice.create(realParam);
        return jsonTool.codeJson(code.success_code, insert_notice)
    } catch (err) {
        return jsonTool.codeJson(code.custom_operate_database_error_code(databaseCode.insert_notice_system_error_code.msg))
    }
}


async function update_notice(noticeParam) {
    if (Object.keys(noticeParam).length <= 0) {
        return jsonTool.codeJson(code.notice_empty_code)
    }
    //检验参数有效性
    var validationParam = paramValidation.objectParamKeyValidation(noticeParam, Object.keys(noticeStruct), 2)
    if (validationParam == false) {
        return jsonTool.codeJson(code.notice_format_error_code)
    }

    try {
        var noticeId = noticeParam.noticeId
        var realParam = noticeParam;
        realParam.updatedAt = now;
        delete realParam['noticeId']
        var update_notice = await model.notice.update(realParam, {
            where: {
                noticeId: noticeId
            }
        })
        return jsonTool.codeJson(code.success_code, update_notice)
    } catch (err) {
        return jsonTool.codeJson(code.custom_operate_database_error_code(databaseCode.update_notice_system_error_code.msg))
    }
}


async function update_notice_status(noticeId, status) {
    if (noticeId == -1 || status == -1) {
        return jsonTool.codeJson(code.notice_update_status_error_code)
    }
    var transaction = await sequelize.transaction();
    try {
        var exist_notice = await model.notice.findOne({
            where: {
                noticeId: noticeId
            }
        }, {
            transaction: transaction
        })
        if (exist_notice == null) {
            return jsonTool.codeJson(code.notice_no_exist_error_code)
        }
        exist_notice = await exist_notice.update({
            status: status
        })
        await transaction.commit()
        return jsonTool.codeJson(code.success_code, exist_notice)
    } catch (err) {
        await transaction.rollback()
        return jsonTool.codeJson(code.custom_operate_database_error_code(databaseCode.update_notice_system_error_code.msg))
    }
}

async function notice_list(page) {
    var noticeList = await model.notice.findAll({
        where: {
            deleted: false
        },
        attributes: ['noticeId', 'title_cn', 'content_cn', 'title_en', 'content_en', 'title_kn', 'content_kn', 'status'],
        offset: (page - 1) * 10,
        limit: 10
    })
    if (noticeList == null) {
        return jsonTool.codeJson(code.success_code, [])
    }
    return jsonTool.codeJson(code.success_code, noticeList)
}

async function delete_notice(noticeId) {
    var transaction = await sequelize.transaction()
    try {
        var exist_notice = await model.notice.findOne({
            where: {
                noticeId: noticeId,
                deleted: false
            }
        }, { transaction: transaction })
        if (exist_notice == null) {
            return jsonTool.codeJson(code.notice_no_exist_error_code)
        }
        await exist_notice.update({
            deleted: true
        })
        return jsonTool.codeJson(code.success_code)
    } catch (err) {
        return jsonTool.codeJson(code.custom_operate_database_error_code(databaseCode.delete_notice_system_error_code.msg))
    }

}

module.exports = {
    insert_notice,
    update_notice,
    update_notice_status,
    notice_list,
    delete_notice
}