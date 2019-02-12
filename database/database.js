const Sequelize = require('sequelize');

//远程数据库
// const databaseName = 'wallet_base';
// const databaseUser = 'iotroot';
// const databasePwd = 'Zhuoapp88';
// const databaseHost = 'rm-m5en0i051edwd9tmeo.mysql.rds.aliyuncs.com';

//本地数据库
const databaseName = 'wallet_base';
const databaseUser = 'root';
const databasePwd = '123456'; //hys
const databaseHost = 'localhost';


const sequelize = new Sequelize(databaseName, databaseUser, databasePwd, {
    host: databaseHost,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;