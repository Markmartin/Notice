function codeJson(codeObject, data) {
    return respJson(codeObject.code, codeObject.msg, data)
}

function respJson(code, msg, data) {
    return {
        code: code,
        msg: msg,
        data: data == undefined ? {} : data
    }
}

//内部使用
function databaseJson(databaseCode, data) {
    return {
        actionStatus: databaseCode.actionStatus,
        msg: databaseCode.msg,
        dataStatus: databaseCode.dataStatus,
        data: data == undefined ? {} : data
    }
}

function validationJson(validationCode) {
    return {
        status: validationCode.status,
        msg: validationCode.msg
    }
}

module.exports = {
    codeJson: codeJson,
    respJson: respJson,
    databaseJson: databaseJson,
    validationJson: validationJson
}