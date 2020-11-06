module.exports = app => {
  //导出一个函数app，该函数接收一个app对象这样就可以使用最外层index的app
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true
  })//express子路由

  const authMiddware = require('../../middieware/auth')//因为写成一个函数来返回这个函数 所以使用不能直接使用 应该加()

  //新建
  router.post('/', async (req, res) => {//接收categories post 的数据 存入数据库
    const model = await req.Model.create(req.body)
    res.send(model)//告诉客户端创建完成并告诉创建了什么
  })

  //修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)//通过id去找然后更新掉
    res.send(model)
  })

  //删除
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)//删除
    res.send({
      success: true
    })
  })

  //列表
  router.get('/', authMiddware(), async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)//限制十条//populate('parent')用于查找数据库里该字段内容
    res.send(items)//将数据传给前端
  })

  router.get('/:id', authMiddware(), async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)//将数据传给前端
  })

  app.use('/admin/api/rest/:resource', authMiddware(), async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)//req.model表示在请求对象上挂载一个属性model
    next()//在请求地址的时候会先处理 async后的内容 有next他会继续处理下一个
  }, router)//挂载子路由

  //图片接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })//把数据传到哪里 __dirname表示当前所在文件夹
  
  app.post('/admin/api/upload', authMiddware(), upload.single('file'), async (req, res) => {//single指单个文件上传
    const file = req.file//使用了中间件 所以可以req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`//拼接出url返回 前提是进行静态托管
    res.send(file)
  })

  //登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body//表示客户端传来的所有数据 解构username password

    //1根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')//强制选择password 因为前面在AdminUser里select: false
    //username: username//第一个为数据库找的值的键 第二个为上面变量

    assert(user, 422, '用户不存在')
    // if (!user) {//如果没有找到user 抛出异常带状态码
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    //2校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)//因为用了bcrypt加密 所以用其校验
    if (password === '') {
      assert(isValid, 422, '密码不能为空')
    }
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    //3返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))//生成一个token//在全局(server/index.js)设置secret
    res.send({ token })
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}