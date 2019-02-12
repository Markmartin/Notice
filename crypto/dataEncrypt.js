const cryptoJS = require('crypto-js');
const pwdSalt = '~!@#$%^&*()';
const manager_secretkey_salt = ')(*&^%$#@!~';

function manager_pwd_generate(pwd) {
    var combinationStr = pwd + pwdSalt + pwd;
    return cryptoJS.MD5(combinationStr).toString();
}

function manager_secretkey_generate(account) {
    var combinationStr = account + manager_secretkey_salt + account;
    return cryptoJS.AES.encrypt(combinationStr, manager_secretkey_salt).toString();
}


module.exports = {
    pwdSalt: pwdSalt,
    manager_secretkey_salt: manager_secretkey_salt,
    manager_pwd_generate: manager_pwd_generate,
    manager_secretkey_generate: manager_secretkey_generate
}