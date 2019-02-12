const model = require('../dataModel')
const jsonTool = require('../../../tools/jsonTool')
const code = require('../../../config/code')
const databaseCode = require('../../../config/databaseCode')
const validationCode = require('../../../config/validationCode')
const dataEncrypt = require('../../../crypto/dataEncrypt')
const paramValidation = require('../../../tools/paramValidation')
const auth = require('../../../crypto/Authentication')

//检查新建账户参数
function check_account_param(account, pwd) {
    if (account == undefined || account.length <= 0) {
        return jsonTool.validationJson(validationCode.account_empty_code)
    }
    if (pwd == undefined || pwd.length <= 0) {
        return jsonTool.validationJson(validationCode.pwd_empty_code)
    }
    var validation_account = paramValidation.accountValidation(account)
    if (validation_account == false) {
        //账户格式不正确
        return jsonTool.validationJson(validationCode.account_format_error_code)
    }
    var validation_pwd = paramValidation.lengthValidation(pwd)
    if (validation_pwd == false) {
        //密码长度不够
        return jsonTool.validationJson(validationCode.pwd_length_short_code)
    }
    //参数验证成功
    return jsonTool.validationJson(validationCode.validation_success_code)
}

//检查是否已经存在
async function check_exist_manager(account) {
    try {
        var exits_manager = await model.noticemanager.find({
            where: {
                account: account
            },
            attributes: ['userId', 'account', 'pwd']
        })
        if (exits_manager == null) {
            //查询成功 数据不存在
            return jsonTool.databaseJson(databaseCode.query_success_no_exist_data_code)
        }
        //查询成功数据存在
        return jsonTool.databaseJson(databaseCode.query_success_exist_data_code, exits_manager)
    } catch (err) {
        //查询失败
        return jsonTool.databaseJson(databaseCode.query_failed_system_error_code, err)
    }
}

//新建用户
async function insert_manager(account, pwd) {
    try {
        var create_manager = await model.noticemanager.create({
            account: account,
            pwd: dataEncrypt.manager_pwd_generate(pwd),
            secretKey: dataEncrypt.manager_secretkey_generate(account)
        })
        return jsonTool.databaseJson(databaseCode.insert_manager_success_code, create_manager)
    } catch (err) {
        return jsonTool.databaseJson(databaseCode.insert_manager_failed_system_error_code, err)
    }
}

//create manager - whole process
async function create_manager_whole_process(account, pwd) {
    var validation_param = check_account_param(account, pwd)
    if (validation_param.status == false) {
        return jsonTool.codeJson(code.param_validation_failed_code(validation_param.msg))
    }
    //参数验证成功
    var exist_manager = await check_exist_manager(account)
    if (exist_manager.actionStatus == false) {
        return jsonTool.codeJson(code.operate_database_error_code, exist_manager.data)
    }
    if (exist_manager.dataStatus == true) {
        return jsonTool.codeJson(code.exist_user_code)
    }
    //插入操作
    var insert_manager_resp = await insert_manager(account, pwd)
    if (insert_manager_resp.actionStatus == false) {
        return jsonTool.codeJson(code.operate_database_error_code, insert_manager_resp.data)
    }
    return jsonTool.codeJson(code.success_code, insert_manager_resp.data)
}

//login - whole process
async function login(account, pwd) {
    var validation_param = check_account_param(account, pwd)
    if (validation_param.status == false) {
        return jsonTool.codeJson(code.param_validation_failed_code(validation_param.msg))
    }
    var exist_manager = await check_exist_manager(account)
    if (exist_manager.actionStatus == false) {
        return jsonTool.codeJson(code.operate_database_error_code, exist_manager.data)
    }
    if (exist_manager.dataStatus == false) {
        return jsonTool.codeJson(code.no_exist_user_code)
    }

    if (auth.authLoginPwd(pwd, exist_manager.data.pwd) == false) {
        return jsonTool.codeJson(code.login_pwd_error_code)
    }

    return jsonTool.codeJson(code.success_code, exist_manager.data)
}

module.exports = {
    check_account_param,
    check_exist_manager,
    insert_manager,
    create_manager_whole_process,
    login
}