<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}管理员</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <el-form-item label='用户名'>
        <el-input v-model="model.username" style="width:220px"></el-input>
      </el-form-item>

      <el-form-item label='密码'>
        <el-input type='text' v-model="model.password" style="width:220px"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type='primary' class="fbtn" @click="cancel()">取消</el-button>
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
    }
  },
  methods: {
    cancel() {
      this.$router.push('/admin_users/list')
    },
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model)//提交到admin_users接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/admin_users', this.model)//提交到admin_users接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('Categories', this.model)//提交到admin_users接口 另一个参数为传入的内容
    // }
      this.$router.push('/admin_users/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)//请求的接口地址
      this.model = res.data
    },

  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style>
    .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
  .fbtn {
    background-color:grey;
    border:1px grey solid;
  }

</style>