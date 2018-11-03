const config = require('../../config/config');
const router = require('koa-router')();


const sequelize = config.sequelize;
const Sequelize = config.Sequelize;

var user_new = sequelize.define('students',
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

var queryFromSomewhere = async (val) =>{
  try{
    var students = await user_new.findAll({
        where: {
            name: val,
        }
    });
    let data = {};
    for (let student of students) {
        data = JSON.stringify(student)
    }
    console.log('新建结果:',data);
    return data;
  }catch(err){
    console.log(err);
  }

};
const registered = async (ctx, next) => {
  router.post('/registered');
  let userName = ctx.request.body.userName;
  let password = ctx.request.body.password;
  console.log("用户信息",userName,password)
  await user_new.create({
    id: Math.random()*100,
    name: userName,
    password: password,
  })
  let data = await queryFromSomewhere(userName);
  console.log(data.name,'新建成员')
  if(Object.keys(data).length !== 0){
    let response = {
      type:'application/json',
      body: {
        status:0,
        code: 0,
        data:{
          message:'新建成功'
        }
      }
    }
    console.log('进来了');
    ctx.response.type = 'application/json';
    ctx.response.body = {
        status:0,
        code: 0,
        data:{
          message:'新建成功'
        }
   };
  }

}

module.exports = registered;