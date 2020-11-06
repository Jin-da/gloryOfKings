<template>
  <div class="login-container">
    <el-card header='请先登录' class='login-card'>
      <el-form @submit.native.prevent='login()'>
        <el-form-item label='用户名'>
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label='密码'>
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type='primary' native-type='submit' class="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)//const res = 传出数据到接口
      localStorage.token = res.data.token//将token保存到浏览器存储
      // sessionStorage则是关掉浏览器后就没了
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  },
}

</script>

<style>
  .login {
    width: 22.5rem;
  }

.el-button--primary {
    color: #FFF;
    background-color: rgb(246, 82, 64);
    border-color: rgb(246, 82, 64);
}

.el-button:focus, .el-button:hover {
    color:white; 
    border-color: rgba(246, 82, 64);
    background-color: rgba(246, 82, 64, 0.8);
}
  .login-card {
    width: 25rem;
    margin: 10rem auto;
  }
</style>