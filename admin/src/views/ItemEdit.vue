<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}物品</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <!-- <el-form-item label='上级分类'>
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label='名称'>
        <el-input v-model="model.name" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item label='图标'>
        <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/upload'"
        :headers='getAuthHeaders()'
        :show-file-list="false"
        :on-success="afterUpload"><!--headers用于解决上传文件无法获取请求头的问题 在main.js-->
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload><!--action是上传的接口地址 $http.defaults指默认参数 里面有url-->
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
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url)//第一个为被赋值的主体 第二个为赋值属性名 第三个值
      //最开始没有 之后添加上去可能没法显示 即响应式的问题 故用这个处理
    },
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)//提交到items接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/items', this.model)//提交到items接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('items', this.model)//提交到items接口 另一个参数为传入的内容
    // }
      this.$router.push('/items/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)//请求的接口地址
      this.model = res.data
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>