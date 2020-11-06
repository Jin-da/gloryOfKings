const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //用于定义模型的字段有哪些
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref:'Category'}//表明这是数据库里的id 后面一个表明它关联的模型 是本身
})

module.exports = mongoose.model('Category', schema)//导出category的模型