const success_code = {
    code: 200,
    msg: 'success'
}

//验证参数错误
const param_validation_failed_code = function(msg) {
    return {
        code: 300,
        msg: msg
    }
}

const no_auth_code = {
    code: 401,
    msg: '授权码不对'
}

const exist_user_code = {
    code: 402,
    msg: '用户已经存在'
}

const no_exist_user_code = {
    code: 403,
    msg: '用户不存在'
}

const login_pwd_error_code = {
    code: 404,
    msg: '密码错误'
}

const notice_empty_code = {
    code: 405,
    msg: '公告新建不能为空'
}

const notice_format_error_code = {
    code: 406,
    msg: '公告参数格式错误'
}

const notice_update_status_error_code = {
    code: 407,
    msg: '更新公共状态参数错误'
}

const notice_no_exist_error_code = {
    code: 408,
    msg: '公告不存在'
}

//不匹配错误
const no_action_match_code = {
    code: 500,
    msg: 'no action match'
}

//数据库操作错误
const operate_database_error_code = {
    code: 600,
    msg: 'operate database failed'
}

const custom_operate_database_error_code = function(mgs) {
    return {
        code: 600,
        msg: msg
    }
}

module.exports = {
    success_code,
    param_validation_failed_code,
    no_auth_code,
    exist_user_code,
    no_exist_user_code,
    no_action_match_code,
    operate_database_error_code,
    login_pwd_error_code,
    notice_empty_code,
    notice_format_error_code,
    custom_operate_database_error_code,
    notice_update_status_error_code,
    notice_no_exist_error_code
}