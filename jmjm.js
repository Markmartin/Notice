var CryptoJS = require("crypto-js");

const secretKey = 'GuYue\'s Power'

var msg = 'Success-Fail';

var encryptoMsg = CryptoJS.AES.encrypt(msg, secretKey).toString();

console.log('未加密的字符串:' + msg)

console.log('加密后的字符串' + encryptoMsg)

var decryptoMsg = CryptoJS.AES.decrypt(encryptoMsg, secretKey).toString(CryptoJS.enc.Utf8);

console.log('解密后的字符串' + decryptoMsg)
