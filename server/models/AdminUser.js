const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false,//决定是否显示
    set(val) {//进行散列 bcrypt
      return require('bcrypt').hashSync(val, 10)//第二个为加密指数 一般为10-12
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)//导出category的模型