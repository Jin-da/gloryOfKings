<template>
  <div>
   <h1>英雄列表</h1> 
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width='230'></el-table-column><!--prop获取数据库数据-->
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
          @click="$router.push('/heroes/edit/'+scope.row._id)" class="btn">编辑</el-button>
          <el-button type="primary" size="small" 
          @click="remove(scope.row)" class="btn">删除</el-button><!--scope.row传递整一行数据-->
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/heroes')
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async() => {
          await this.$http.delete(`rest/heroes/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()//重新获取数据
        }).catch((err) => {
          console.log(err);
        })
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style>
  .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
  .btn:hover {
    background-color:rgba(246, 82, 64,0.8)
  }
</style>