const CryptoJS = require('crypto-js');
const dataEncrypt = require('./dataEncrypt');
const originalSuperKey = 'GuYue\'s Power';
// const encryptSuperKey = 'U2FsdGVkX19evSEmYzeo2lC3so4gstQbkxLabVfQvOE='

function authCreateManager(encryptedKey) {
    var decryptedKey = CryptoJS.AES.decrypt(encryptedKey, originalSuperKey).toString(CryptoJS.enc.Utf8);
    return decryptedKey == originalSuperKey ? true : false;
}

function authLoginPwd(pwd, encryptPwd) {
    var ePwd = CryptoJS.MD5(pwd + dataEncrypt.pwdSalt + pwd).toString();
    return ePwd == encryptPwd ? true : false;
}

function authPublishNotice(account, secretKey) {
    var originKey = CryptoJS.AES.decrypt(secretKey, dataEncrypt.manager_secretkey_salt).toString(CryptoJS.enc.Utf8);
    var combineStr = account + dataEncrypt.manager_secretkey_salt + account;
    return originKey == combineStr ? true : false;
}

module.exports = {
    authCreateManager: authCreateManager,
    authLoginPwd: authLoginPwd,
    authPublishNotice: authPublishNotice
}