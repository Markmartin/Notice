const account_empty_code = {
    status: false,
    msg: '账户不能未空'
}

const pwd_empty_code = {
    status: false,
    msg: '密码不能未空'
}

const account_format_error_code = {
    status: false,
    msg: '账户格式不正确'
}

const pwd_length_short_code = {
    status: false,
    msg: '密码长度太短'
}

const validation_success_code = {
    status: true,
    msg: '参数验证成功'
}



module.exports = {
    account_empty_code,
    pwd_empty_code,
    account_format_error_code,
    pwd_length_short_code,
    validation_success_code
}