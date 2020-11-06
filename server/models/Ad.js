const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{//轮播图为一个items数组 一个广告为一个对象
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)//导出category的模型