// 数据库配置信息
const Sequelize = require('sequelize');

const config = {
    database: 'test', // 使用哪个数据库
    username: 'localhost', // 用户名
    password: 'root', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};
// 连接数据库
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = {sequelize,Sequelize};