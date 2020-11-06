module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {//数据库地址
    useNewUrlParser: true,//两个必加否则报错
    useUnifiedTopology: true
  })

  //有时候没有使用过模型会报错 所有将所有模型使用一边
  require('require-all')(__dirname + '/../models')
}