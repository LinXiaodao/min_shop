const isLoginSucess = require('../controllers/user/login');
const isRegistered = require('../controllers/user/registered');
// 登录校验
const login =  async (ctx,next) =>{
  await isLoginSucess(ctx,next)
}

const registered = async (ctx,next) =>{
  await isRegistered(ctx,next);
}
const GET = {};

const POST = {
  login,
  registered,

};

module.exports = {
  GET,
  POST,
}