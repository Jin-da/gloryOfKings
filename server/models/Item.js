const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //用于定义模型的字段有哪些
  name: {type: String},
  icon: {type: String}
})

module.exports = mongoose.model('Item', schema)//导出category的模型