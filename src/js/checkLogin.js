// var mysql = require('mysql');
// let userMes=[];
// // const getUserMes = () =>{
//     //连接数据库
//   var connection = mysql.createConnection({
//       host:'localhost',
//       user:'localhost',  //用户名
//       password:'root',   //密码
//       database:'test',
//       port:'3306'     //端口号
//   });
//   connection.connect(function(err){
//       if(err){
//         console.log('---:'+err);
//         return;
//       }
//       console.log('连接succeed');
//   });
//   // 插入一条数据
//   var sql = 'insert into students (id,name,sex) values(?,?)';
//   var param = [null,'林大傻','男'];
//   connection.query(sql,param,function(err,rs){
//       if(err){
//           console.log(err.message);
//           return;
//       }
//       console.log('插入数据succeed');
//   });
//   //执行查询 查询study数据库中的student表的数据
//   connection.query('select * from students',function(err,rs){
//       if(err){
//           console.log(err);
//           return;
//       }
//       for(var i=0;i<rs.length;i++){
//           userMes[i] = rs[i].name;
//       }
//   });
//   //关闭数据库
//   connection.end(function(err){
//       if(err){
//         console.log('---:'+err);
//         return;
//       }
//       console.log('关闭succeed');
//   });
// // }

// module.exports = userMes;

const Sequelize = require('sequelize');
var config = {
    database: 'test', // 使用哪个数据库
    username: 'localhost', // 用户名
    password: 'root', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};
//创建一个sequelize对象实例：
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// const checkLogin = async () =>{

// }
// 定义查询的表和数据结构
var Pet = sequelize.define('students', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    sex: Sequelize.STRING(4),
    age: Sequelize.STRING(4),
    tel: Sequelize.STRING(11),
}, {
    timestamps: false
});

console.log(sequelize.models,'定义的模型')

//写入数据
// var now = Date.now();
// (async () => {
//     var dog = await Pet.create({
//     id: '4',
//     name: '林锦坤',
//     sex: '男',
//     age: '25',
//     tel: '13250245215',
// });
// console.log('created: ' + JSON.stringify(dog));
// })();

// 根据字段查询数据列表
var queryFromSomewhere = async (val) =>{
  try{
    var students = await Pet.findAll({
        where: {
            name: val,
        }
    });
    let data = {};
    for (let student of students) {
        console.log(JSON.stringify(student),'查詢數據');
        data = JSON.stringify(student)
    }
    console.log('查询结果:',data);
    return data;
  }catch(err){
    console.log(err);
  }

};

// 通过获取的示例进行数据更新
// (async () => {
//     try{
//         var pets = await queryFromSomewhere("林锦坤");
//         // for (let p of pets) {
//         //     p.gender = true;
//         //     p.updatedAt = Date.now();
//         //     p.version++;
//         //     await p.save();
//         // }
//     }catch(err){
//         console.log(err);
//     }
// })();
module.exports = queryFromSomewhere