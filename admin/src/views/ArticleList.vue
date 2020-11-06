<template>
  <div>
   <h1>文章列表</h1> 
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width='230'></el-table-column><!--prop获取数据库数据-->
      <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" 
          @click="$router.push('/articles/edit/'+scope.row._id)" class="btn">编辑</el-button>
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
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否删除文章"${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async() => {
          await this.$http.delete(`rest/articles/${row._id}`)
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

<style >
    .btn {
    background-color:rgb(246, 82, 64);
    border:1px rgb(246, 82, 64) solid;
  }
</style>