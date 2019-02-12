//数据库连接
const sequelize = require('../database/database');
//modelManager
const model = require('../database/dataModel/dataModel.js');
//model logic->noticeManager
const noticeManager_model_logic = require('../database/dataModel/modelLogic/noticeManager_model_logic');
//tool
const jsonTool = require('../tools/jsonTool')
const code = require('../config/code')
const dataEncrypt = require('../crypto/dataEncrypt')



function addNoticeManager(account, pwd) {
    var param_validation = await noticeManager_model_logic.param_validation(account, pwd);
    if (param_validation.status == false) {
        return jsonTool.respJson(code.param_validation_failed_code.code, param_validation.msg)
    }

    var exist_manager = await noticeManager_model_logic.check_exist_manager(account)
    if (exist_manager.status == false) {
        return jsonTool.codeJson(code.operate_database_error_code, exist_manager.data)
    }
    if (exist_manager.dataStatus == true) {
        return jsonTool.codeJson(code.exist_user_code)
    }
    // //新建用户
    // try {

    //     var exist_manager = await model.noticemanager.find({
    //         where: {
    //             account: account
    //         }
    //     });

    //     if (exist_manager != null) {
    //         //用户存在
    //         return jsonTool.codeJson(code.exist_user_code)
    //     }
    //     var create_manager = await model.noticemanager.create({
    //         account: account,
    //         pwd: dataEncrypt.manager_pwd_generate(pwd),
    //         secretKey: dataEncrypt.manager_secretkey_generate(account)
    //     });
    //     //成功创建返回
    //     return jsonTool.codeJson(code.success_code, create_manager)
    // } catch (err) {
    //     return jsonTool.codeJson(code.operate_database_error_code, err)
    // }
}

module.exports = {
    addNoticeManager
}