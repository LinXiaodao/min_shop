var koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('./controllers/common');
var app = new koa();


app.use(bodyParser());

//登录校验
//router.post('/loginSuccess',login)
app.use(_.main)

// 监听端口8888
app.listen(8888);
console.log('Server is running at http://127.0.0.1:8888/');

