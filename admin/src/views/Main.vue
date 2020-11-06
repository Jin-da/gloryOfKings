<template>
  <el-container style="height: 100vh;">
  <el-aside width="200px" class="navbar">
    <el-menu router  unique-opened :default-active='$route.path'>
      <!-- findOneAndDelete() -->

      <el-submenu index="1" class="navbar">
        <template slot="title"><i class="el-icon-message"></i><i class="message">内容管理</i></template>
        <el-menu-item-group  class="navbar">
          <template slot="title">物品</template>
          <el-menu-item index="/items/create" class="navbar-hover">新建物品</el-menu-item>
          <el-menu-item index="/items/list" class="navbar-hover">物品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group  class="navbar">
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/create" class="navbar-hover">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list" class="navbar-hover">英雄列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group  class="navbar">
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create" class="navbar-hover">新建文章</el-menu-item>
          <el-menu-item index="/articles/list" class="navbar-hover">文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2" class="navbar">
        <template slot="title"><i class="el-icon-message"></i><i class="message">运营管理</i></template>
        <el-menu-item-group  class="navbar">
          <template slot="title" style="border-bottom:3px rgb(246, 82, 64) solid">分类</template>
          <el-menu-item index="/categories/create" class="navbar-hover">新建分类</el-menu-item>
          <el-menu-item index="/categories/list" class="navbar-hover">分类列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group  class="navbar">
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create" class="navbar-hover">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list" class="navbar-hover">广告位列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3" class="navbar">
        <template slot="title"><i class="el-icon-message"></i><i class="message">系统设置</i></template>
        <el-menu-item-group  class="navbar">
          <template slot="title" style="border-bottom:3px rgb(246, 82, 64) solid">管理员</template>
          <el-menu-item index="/admin_users/create" class="navbar-hover">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list" class="navbar-hover">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;background-color:white" >
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px" ></i>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>斤达</span>
    </el-header>
    
    <el-main >
      <router-view :key="$route.path"></router-view><!--根据路径区分 以排除使用同一个组件的两个页面没法被区分-->
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-submenu__title:focus, .el-submenu__title:hover {
    background-color: rgb(37,44,50);
  }

  i {
    font-style: normal;
  }

.el-menu-item.is-active {
  color: white;
  background-color: rgb(37,44,50);
  border-left:3px rgb(246, 82, 64) solid;
}
  .navbar {
     background-color:rgb(37,44,50)
    
}

  .navbar-hover {
    color: gray
  }


  .navbar-hover:hover {
    background: rgb(37,44,50);
    /* border-left:3px rgb(246, 82, 64) solid; */
    color: white;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
  };
</script>
