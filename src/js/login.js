const queryFromSomewhere = require('./checkLogin');
//登录请求处理
const login = async (ctx, next) => {
    let requestBody = ctx.request.body;
    let responText = '';
    await queryFromSomewhere(requestBody.userName).then(
        function(getUserMes) {
            try {
                console.log("获取用户信息2：", JSON.parse(getUserMes).name)
                let UserMes = JSON.parse(getUserMes);
                if (UserMes.name) {
                    let flag = requestBody.userName == UserMes.name && requestBody.password == UserMes.id;
                    responText = flag ? requestBody.userName : '用户名或密码错误';
                } else {
                    responText = '用户不存在'
                }
                ctx.response.type = 'html';
                ctx.response.body = {
                    code:200,
                    data:{
                      message: "恭喜你，"+responText+',登录成功'
                    }
                };
            } catch (err) {
                console.log(err)
            }
            //
        })
        // ctx.response.body = {
        //     code:200,
        //     data:[
        //       {
        //         message:'登录成功'
        //       }
        //     ]
        // };

}

module.exports = login;