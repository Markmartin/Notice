function accountValidation(account) {
    var mailRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (mailRegex.test(account)) {
        return true;
    } else {
        return false;
    }
}

function lengthValidation(validationStr, length) {
    validationStr = validationStr == undefined ? '' : validationStr;
    if (length == undefined || length < 6) {
        length = 6;
    }
    return validationStr.length >= length ? true : false;
}


function objectParamKeyValidation(toBeVerifiedParam, validationKeys, requireCount) {
    var count = 0;
    for (var key in toBeVerifiedParam) {
        if (validationKeys.indexOf(key) != -1) {
            if (toBeVerifiedParam[key].length >= 0) {
                count++
            }
        } else {
            delete toBeVerifiedParam[key]
        }
    }
    return count >= requireCount ? true : false;
}

module.exports = {
    accountValidation,
    lengthValidation,
    objectParamKeyValidation
}