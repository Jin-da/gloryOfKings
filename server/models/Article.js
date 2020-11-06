const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//表明这是数据库里的id 后面一个表明它关联的模型
  //因为可能有多个定位 所以写成复数并改成数组形式
  body: { type: String },
}, {
  timestamps: true//时间戳 自己创建两个字段 创建时间和更新时间
})

module.exports = mongoose.model('Article', schema)//导出category的模型