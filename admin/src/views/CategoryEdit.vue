<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}分类</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <el-form-item label='上级分类'>
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称'>
        <el-input v-model="model.name" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit' class="btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id:{}
  },
  data() {
    return {
      model: {},
      parents:[]
    }
  },
  methods: {
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model)//提交到categories接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/categories', this.model)//提交到categories接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('Categories', this.model)//提交到categories接口 另一个参数为传入的内容
    // }
      this.$router.push('/categories/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)//请求的接口地址
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)//请求的接口地址
      this.parents = res.data
    }

  },
  created() {
    this.fetchParents()
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