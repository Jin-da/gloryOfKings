<template>
  <div>
    <div class="topbar  py-2 px-3 d-flex ai-center topnav">
      <img src="../assets/logo.png" height="32">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div> 
    
    <div class="nav bg-primary pt-3  pb-2">
      <div class="nav d-flex  jc-around pb-1 nav-inverse">
        <div class="nav-item active">
          <router-link tag='div' to="/" class="nav-link">首页</router-link><!--tag修改标签为div而不是默认的a-->
        </div>
        <div class="nav-item">
          <router-link tag='div' to="/" class="nav-link">攻略中心</router-link><!--tag修改标签为div而不是默认的a-->
        </div>
        <div class="nav-item">
          <router-link tag='div' to="/" class="nav-link">赛事中心</router-link><!--tag修改标签为div而不是默认的a-->
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }  
</style>
