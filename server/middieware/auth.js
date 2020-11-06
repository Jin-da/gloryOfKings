//按理应这样配置但是这样配置是不可编辑的

//module.exports = async (req, res, next) => {
  //检验用户是否登录
  //1获取用户信息 一般是在请求头获取request headers 在https加 https://www.npmjs.com/package/axios搜索interceptors
//  const token = String(req.headers.authorization || '').split(' ').pop()//获取到请求头的authorization 用小写 前端用大写 split分割后为数组 使用pop获取最后面一个 就是token
 // assert(token, 401, '请先登录')

 // const { id } = jwt.verify(token, app.get('secret'))//2 使用vaerify校验 并获取id
 // assert(id, 401, '请先登录')

  //const tokenData = jwt.verify(token, app.get('secret')) console.log(tokenData);//此时tokenData获得的就是当前用户的id
 // req.user = await AdminUser.findById(id)//3 使用req使得所有接口请求都会进行校验 根据id查找用户赋到req.user
 // assert(req.user, 401, '请先登录')

 // await next()

//}



//应该写成一个函数来返回这个函数 同db.js
module.exports = options => {
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')

  return async (req, res, next) => {
    //检验用户是否登录
    //1获取用户信息 一般是在请求头获取request headers 在https加 https://www.npmjs.com/package/axios搜索interceptors
    const token = String(req.headers.authorization || '').split(' ').pop()//获取到请求头的authorization 用小写 前端用大写 split分割后为数组 使用pop获取最后面一个 就是token
    assert(token, 401, '请先登录')

    const { id } = jwt.verify(token, req.app.get('secret'))//2 使用vaerify校验 并获取id
    assert(id, 401, '请先登录')

    //const tokenData = jwt.verify(token, app.get('secret')) console.log(tokenData);//此时tokenData获得的就是当前用户的id
    req.user = await AdminUser.findById(id)//3 使用req使得所有接口请求都会进行校验 根据id查找用户赋到req.user
    assert(req.user, 401, '请先登录')

    await next()

  }
}

