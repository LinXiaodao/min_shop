const config = require('../config/config');
var koa = require('koa');
const router = require('koa-router')();
var app = new koa();
const sequelize = config.sequelize;
const Sequelize = config.Sequelize;

// 定义查询的表和数据结构
var Pet = sequelize.define('students',
 {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
},
 {
    timestamps: false
});


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
        data = JSON.stringify(student)
    }
    console.log('查询结果:',data);
    console.log('输出类型',data)
    return data;
  }catch(err){
    console.log(err);
  }

};
//登录请求处理
const login = async (ctx, next) => {
    console.log("进来了")
    console.log('ctx:',ctx)
    let requestBody = ctx.request.body;
    let responText = '';
    let flag = false;
    await queryFromSomewhere(requestBody.userName).then(
        function(getUserMes) {
            try {
                 console.log("获取用户信息：", JSON.parse(getUserMes).name)
                if(Object.keys(getUserMes).length === 0){
                    responText = '用户不存在'
                }else{
                    let UserMes = JSON.parse(getUserMes);
                    if (UserMes.name) {
                        flag = requestBody.userName == UserMes.name && requestBody.password == UserMes.id;
                        if(flag){
                            responText = '登录成功';

                        }else{
                            responText = '用户名或密码错误';
                        }
                    }
                }
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code:200,
                    data:{
                      message: responText,
                    }
                };

            } catch (err) {
                console.log(err)
            }
        })

}

module.exports = login;