const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //用于定义模型的字段有哪些
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },//称号
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//表明这是数据库里的id 后面一个表明它关联的模型 是本身
  //因为可能有多个定位 所以写成复数并改成数组形式
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{//多个就使用数组
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//和分类类似 是数据库中关联获取 关联到item.js
  usageTips: { type: String },//使用技巧
  battleTips: { type: String },//对抗技巧
  teamTips: { type: String },//团战技巧
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')//导出category的模型 第三个参数为这个模型在数据库中的表名 默认为小写复数 有时候会因为不够只能 比如heros