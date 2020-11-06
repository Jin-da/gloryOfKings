<template>
  <div class="about">
    <h1>{{id?'编辑' : '新建'}}英雄</h1>
    <el-form label-width='120px' @submit.native.prevent='save'><!--表单-->
      <!-- <el-form-item label='上级分类'>
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item> -->

      <el-tabs>
        <el-tab-pane label='基础信息'>
          <el-form-item label='名称'>
            <el-input v-model="model.name" style="width:180px"></el-input>
            </el-form-item>

            <el-form-item label='称号'>
              <el-input v-model="model.title" style="width:180px"></el-input>
            </el-form-item>

            <el-form-item label='头像'>
              <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers='getAuthHeaders()'
              :show-file-list="false"
              :on-success="res=> $set(model, 'avatar', res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload><!--action是上传的接口地址 $http.defaults指默认参数 里面有url-->
            </el-form-item>

            <el-form-item label='Banner'>
              <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers='getAuthHeaders()'
              :show-file-list="false"
              :on-success="res=> $set(model, 'banner', res.iturl)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload><!--action是上传的接口地址 $http.defaults指默认参数 里面有url-->
            </el-form-item>

            <el-form-item label='类型'>
              <el-select v-model="model.categories" style="width:180px" multiple>
                <el-option v-for="item of categories" :key="item._id"
                :label='item.name' :value='item._id'
                ></el-option><!--从分类列表里找出 label是显示内容 value是查找的参考值-->
              </el-select>
            </el-form-item>

            <el-form-item label='难度'>
              <el-rate :max='9' show-score v-model="model.scores.difficult" style="width:250px;margin-top:0.7rem"></el-rate>
            </el-form-item>

            <el-form-item label='技能'>
              <el-rate :max='9' show-score v-model="model.scores.skills" style="width:250px;margin-top:0.7rem"></el-rate>
            </el-form-item>

            <el-form-item label='攻击'>
              <el-rate :max='9' show-score v-model="model.scores.attack" style="width:250px;margin-top:0.7rem"></el-rate>
            </el-form-item>

            <el-form-item label='生存'>
              <el-rate :max='9' show-score v-model="model.scores.survive" style="width:250px;margin-top:0.7rem"></el-rate>
            </el-form-item>

            <el-form-item label='顺风出装' style="margin-left:28px">
              <el-select v-model="model.items1" style="width:180px" multiple>
                <el-option v-for="item of items" :key="item._id"
                :label='item.name' :value='item._id'
                ></el-option><!--从分类列表里找出 label是显示内容 value是查找的参考值-->
              </el-select>
            </el-form-item>

            <el-form-item label='逆风出装' style="margin-left:28px">
              <el-select v-model="model.items2" style="width:180px" multiple>
                <el-option v-for="item of items" :key="item._id"
                :label='item.name' :value='item._id'
                ></el-option><!--从分类列表里找出 label是显示内容 value是查找的参考值-->
              </el-select>
            </el-form-item>
            
            <el-form-item label='使用技巧' style="width:800px;margin-left:28px">
              <el-input type='textarea' v-model="model.usageTips"></el-input>
            </el-form-item>

            <el-form-item label='对抗技巧' style="width:800px;margin-left:28px">
              <el-input type='textarea' v-model="model.battleTips"></el-input>
            </el-form-item>

            <el-form-item label='团战思路' style="width:800px;margin-left:28px">
              <el-input type='textarea' v-model="model.teamTips"></el-input>
            </el-form-item>
        </el-tab-pane>

        <el-tab-pane label='技能' class="skill-btn">
          <el-button @click="model.skills.push({})" size='small'><i class="el-icon-plus"></i>添加技能</el-button>
          <br><br>
          <el-row type='flex' style="flex-wrap: wrap"><!--style用于换行-->
            <el-col :md='12' v-for="(item, i) in model.skills" :key="i">
              <i style="margin-left:50px">技能</i>
              <br><br>
              <el-form-item label='名称' style="width: 500px">
                <el-input v-model="item.name"></el-input>  
              </el-form-item>

              <el-form-item label='图标'>
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers='getAuthHeaders()'
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'icon', res.url)"><!--第一个为被赋值的主体 第二个为赋值属性名 第三个值-->
                  <!-- res=>item.icon=res.url -->
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label='冷却' style="width: 500px">
                <el-input v-model="item.delay"></el-input>  
              </el-form-item>

              <el-form-item label='消耗' style="width: 500px">
                <el-input v-model="item.cost"></el-input>  
              </el-form-item>
              
              <el-form-item label='描述' style="width: 500px">
                <el-input type='textarea' v-model="item.description"></el-input>  
              </el-form-item>

              <el-form-item label='小提示' style="width: 500px">
                <el-input type='textarea' v-model="item.tips"></el-input>  
              </el-form-item>

              <el-form-item>
                <el-button type='danger' @click="model.skills.splice(i, 1)" class="dangerbtn">删除</el-button>
              </el-form-item>

              <br><br><br>

            </el-col><!--:md中等屏幕-->
          </el-row><!--分栏布局 flex布局-->
        </el-tab-pane>

        <el-tab-pane label='最佳搭档' class="skill-btn" name='partners'>
          <el-button @click="model.partners.push({})" size='small'><i class="el-icon-plus"></i>添加</el-button>
          <br><br>
          <el-row type='flex' style="flex-wrap: wrap"><!--style用于换行-->
            <el-col :md='12' v-for="(item, i) in model.partners" :key="i">
              <i style="margin-left:50px">技能</i>
              <br><br>
              <el-form-item label='英雄' style="width: 500px">
                <el-select filterable v-model="item.hero"><!--filterable提供搜索功能 value为选择后的保存值 label为显示的值-->
                  <el-option v-for="hero in heroes" :key="hero._id" :value='hero._id' :label='hero.name'></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label='描述' style="width: 500px">
                <el-input type='textarea' v-model="item.description"></el-input>  
              </el-form-item>

              <el-form-item>
                <el-button type='danger' @click="model.partners.splice(i, 1)" class="dangerbtn">删除</el-button>
              </el-form-item>

              <br><br><br>

            </el-col><!--:md中等屏幕-->
          </el-row><!--分栏布局 flex布局-->
        </el-tab-pane>
      </el-tabs>

    
      <el-form-item style="margin-top: 1rem">
        <el-button type='primary' native-type='submit' class="btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script >
export default {
  props: {
    id:{}
  },
  data() {
    return {
      categories:[],
      items:[],
      heroes:[],
      model: {
        name:'',
        avatar:'',
        banner:'',
        skill: [],
        partners:[],
        scores:{
          difficult:0,
          skills:0,
          survive:0,
          attack:0
        },
        skills:[]
      },
    }
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url

      // this.$set(this.model, 'avatar', res.url)//第一个为被赋值的主体 第二个为赋值属性名 第三个值
      // //最开始没有 之后添加上去可能没法显示 即响应式的问题 故用这个处理
    },
    async save() {
      //let res  
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model)//提交到items接口 另一个参数为传入的内容
      } else {
        await this.$http.post('rest/heroes', this.model)//提交到items接口 另一个参数为传入的内容
      }
      //↑res = 
      // save() {
      // this.$http.post('items', this.model)//提交到items接口 另一个参数为传入的内容
    // }
      this.$router.push('/heroes/list')
      this.$message ({
        type: 'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)//请求的接口地址
      this.model = Object.assign({}, this.model, res.data)//一个空对象 先将this.model的数据放进去 res.data再进去而不会替换掉model
      // this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)//请求的接口地址
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)//请求的接口地址
      this.items = res.data
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`)//请求的接口地址
      this.heroes = res.data
    }
  },
  created() {
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()
    this.id && this.fetch()
  },
}
</script>

<style>

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
</style>