const fs = require('fs');
const url = require('url');
const http = require('http');
var koa = require('koa');
const route = require('koa-route');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
var app = new koa();

// 连接数据库
//const config = require('./mysql.js');
const login = require('./src/js/login');



// 相应内容
const main = async(ctx,next) => {
    if(ctx.request.path === '' || ctx.request.path === '/' ||ctx.request.path === '/index.html'){
        var indexHtml = fs.createReadStream('index.html');
        ctx.response.type = 'html';
        ctx.response.body = indexHtml;
    }else{
        ctx.response.type = 'html';
        ctx.response.body = '这是其他页面';
    }
    return;
}


app.use(async (ctx, next) => {
    await next();
});
app.use(bodyParser());
// 初始化首页
const routeIndex = ['/','','/index.html'];
routeIndex.forEach(function(val){
    router.get(val, main);
})
//登录校验
router.post('/loginSuccess',login)
app.use(router.routes());

// 监听端口8888
app.listen(8888);
console.log('Server is running at http://127.0.0.1:8888/');

