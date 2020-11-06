<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}广告位</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <el-form-item label='名称'>
        <el-input v-model="model.name" style="width:220px"></el-input>
      </el-form-item>

      <el-form-item label='广告'>
        <el-button @click="model.items.push({})" size='small'><i class="el-icon-plus"></i>添加广告</el-button>
      <br><br>
      <el-row type='flex' style="flex-wrap: wrap"><!--style用于换行-->
            <el-col :md='12' v-for="(item, i) in model.items" :key="i">
              <el-form-item label='跳转链接' style="width: 500px">
                <el-input v-model="item.url"></el-input>  
              </el-form-item>
              <br>

              <el-form-item label='图片'>
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'image', res.url)"><!--第一个为被赋值的主体 第二个为赋值属性名 第三个值-->
                  <!-- res=>item.icon=res.url -->
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <br>
              <el-form-item>
                <el-button type='danger' @click="model.items.splice(i, 1)" class="dangerbtn">删除</el-button>
              </el-form-item>

             

            </el-col><!--:md中等屏幕-->
          </el-row><!--分栏布局 flex布局-->
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
      model: {
        items: []
      },
      parents:[]
    }
  },
  methods: {
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model)//提交到ads接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/ads', this.model)//提交到ads接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('Categories', this.model)//提交到ads接口 另一个参数为传入的内容
    // }
      this.$router.push('/ads/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)//请求的接口地址
      this.model = Object.assign({}, this.model, res.data)//一个空对象 先将this.model的数据放进去 res.data再进去而不会替换掉model
      // this.model = res.data 避免被覆盖
    },

  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style>

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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }

    .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
.dangerbtn {
    background-color:grey;
    border-color:grey
  }

  .el-tabs__item:hover {
    color:black;
  }


.skill-btn :hover{
  color:black;
  background-color:white;
}

  .el-tabs__active-bar {
    background-color: rgb(246, 82, 64);

  }

  .el-tabs__item.is-active {
    color: black;
}
    .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
</style>