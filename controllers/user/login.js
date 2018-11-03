const config = require('../../config/config');
const router = require('koa-router')();


const sequelize = config.sequelize;
const Sequelize = config.Sequelize;

// 定义数据模型
var Pet = sequelize.define('students',
 {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    password: Sequelize.STRING(8)
},
 {
    timestamps: false
});

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
    console.log("查询结果",data)
    return data;
  }catch(err){
    console.log(err);
  }

};
//登录请求处理
const login = async (ctx, next) => {
    router.post('/login');
    console.log('ctx:',ctx)
    let requestBody = ctx.request.body;
    let responText = '';
    let status = -1;
    let flag = false;
    await queryFromSomewhere(requestBody.userName).then(
        function(getUserMes) {
            try {
                if(Object.keys(getUserMes).length === 0){
                    responText = '用户不存在'
                }else{
                    let UserMes = JSON.parse(getUserMes);
                    if (UserMes.name) {
                        flag = requestBody.userName == UserMes.name && requestBody.password == UserMes.password;
                        if(flag){
                            responText = '登录成功';
                            status = 0;

                        }else{
                            responText = '用户名或密码错误';
                        }
                    }
                }
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code:200,
                    stutas:status,
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