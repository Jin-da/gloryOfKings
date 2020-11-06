const express = require('express')

const app = express()//实例化express

app.set('secret', 'asf12fdsag1')

app.use(require('cors')())//跨域模块
app.use(express.json())
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname + '/web'))
app.use('/uploads',express.static(__dirname + '/uploads'))//静态托管 使图片可以访问

require('./plugins/db')(app)//数据库使用一样的方法
require('./routes/admin')(app)//结合routes/admin/index看 这样这个index就有一个app可以用 此处括号app传入到admin的index
require('./routes/web')(app)//三条均为引用路由

app.listen(3000, () => {
  console.log('http://localhost:3000');
})