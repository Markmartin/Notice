const query_success_exist_data_code = {
    actionStatus: true,
    msg: '查询成功,数据存在',
    dataStatus: true
}

const query_success_no_exist_data_code = {
    actionStatus: true,
    msg: '查询成功,数据不存在',
    dataStatus: false
}

const query_failed_system_error_code = {
    actionStatus: false,
    msg: 'query database failed',
    dataStatus: false
}

const insert_manager_success_code = {
    actionStatus: true,
    msg: '新建通知管理员成功',
    dataStatus: true
}

const insert_manager_failed_system_error_code = {
    actionStatus: false,
    msg: 'insert manager database failed',
    dataStatus: false
}

const insert_notice_system_error_code = {
    actionStatus: false,
    msg: 'insert notice database failed',
    dataStatus: false
}

const update_notice_system_error_code = {
    actionStatus: false,
    msg: 'update notice database failed',
    dataStatus: false
}

const delete_notice_system_error_code = {
    actionStatus: false,
    msg: 'delete notice database failed',
    dataStatus: false
}

module.exports = {
    query_success_exist_data_code,
    query_success_no_exist_data_code,
    query_failed_system_error_code,
    insert_manager_success_code,
    insert_manager_failed_system_error_code,
    insert_notice_system_error_code,
    update_notice_system_error_code,
    delete_notice_system_error_code
}