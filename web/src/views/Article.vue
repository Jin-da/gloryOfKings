<template>
  <div class="page-article" v-if="model"><!--v-if='mdoel'表示model为null时不渲染这一块 避免报错-->
    <div class="d-flex py-3 px2 border-bottom">
      <router-link tag="div" class="iconfont icon-Back text-blue" :to="`/`"></router-link>
      <strong class="flex-1 fs-sm text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">
        2019-06-06
      </div>
    </div>

    <div v-html="model.body" class="px-3 body fs-xl"></div>
    <!-- 渲染详情 -->
    <!-- 此处给a标签设置了全局行高 -->

    <div class="px-3 py-2 mb-5">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-sm ml-1">相关资讯</strong>
      </div>

      <div class="pt-3 fs-sm">
        <router-link class="py-1" :to="`/articles/${item._id}`" tag='div' v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {//在路由router/index.js写上props true后 所有path中的参数能够在其组件中使用
    id: {required: true}
  },
  data() {
    return {
      model: null
    }
  },
  watch: {
    // id: 'fetch'
    id() {//id变化后 执行fetch 避免点击相关资讯页面不变化
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>


<style lang="scss">
.page-article {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }

    iframe {
      width: 100%;
      height: auto;
    }
  }
}
  
</style>