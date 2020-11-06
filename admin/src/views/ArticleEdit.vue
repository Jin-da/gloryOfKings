<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}文章</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <el-form-item label='所属分类'>
        <el-select v-model="model.categories" multiple><!--同一篇文章可能属于多个分类-->
          <el-option v-for="item in categories" :key="item._id" :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='标题'>
        <el-input v-model="model.title" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label='详情'>
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded" style="width:500px"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit' class="btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";//引入富文本编辑器
export default {
  props: {
    id:{}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      parents:[],
      categories:[]
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      var formData = new FormData();
      formData.append("file", file);
 
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)//提交到articles接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/articles', this.model)//提交到articles接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('Categories', this.model)//提交到articles接口 另一个参数为传入的内容
    // }
      this.$router.push('/articles/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)//请求的接口地址
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)//请求的接口地址
      this.categories = res.data
    }

  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
}
</script>

<style>
    .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
</style>