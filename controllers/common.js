const fs = require('fs');
const login = require('./login');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const main = async(ctx,next) => {
    console.log('请求',ctx.request)
    const path = ctx.request.url;
    if(path.indexOf('html')>0){
      let pathName = '';
      path === '' || path === '/'?pathName = './views/index.html':pathName = path;
      var indexHtml = fs.createReadStream('.'+pathName);
      router.get(path);
      ctx.response.type = 'html';
      ctx.response.body = indexHtml;
    }else{
      router.post('/loginSuccess');
      await login(ctx,next)
    }
}

module.exports = {
  main,
}