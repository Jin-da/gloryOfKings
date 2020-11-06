<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img
          src="../assets/images/4c8e1742e89267d40d6688e08a19764a.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/images/50b15e8b8e22ffff726ad34eb03236db.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/images/89f11d1d1cb36320e65a5c0ba73cbb61.jpeg"
          class="w-100"
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>

    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-4 text-dark-1">
      <div class="d-flex flex-wrap">
        
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-1 fs-sm">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-gsz"></i>
          <div class="py-1 fs-sm">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-zbsc"></i>
          <div class="py-1 fs-sm">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-tyf"></i>
          <div class="py-1 fs-sm">体验服</div>
        </div>
        <div class="nav-item mb-3"   :class="{activ:flag}">
          <i class="sprite sprite-xrzq"></i>
          <div class="py-1 fs-sm">新人专区</div>
        </div>
        <div class="nav-item mb-3"  :class="{activ:flag}">
          <i class="sprite sprite-rycc"></i>
          <div class="py-1 fs-sm">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3"  :class="{activ:flag}">
          <i class="sprite sprite-trsq"></i>
          <div class="py-1 fs-sm">同人社区</div>
        </div>
        <div class="nav-item mb-3"  :class="{activ:flag}">
          <i class="sprite sprite-wzyd"></i>
          <div class="py-1 fs-sm">王者营地</div>
        </div>
        <div class="nav-item mb-3"  :class="{activ:flag}">
          <i class="sprite sprite-gzh"></i>
          <div class="py-1 fs-sm">公众号</div>
        </div>
        <div class="nav-item mb-3"  :class="{activ:flag}">
          <i class="sprite sprite-bbjs"></i>
          <div class="py-1 fs-sm">版本介绍</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm" @click="zhankai()">
        <i class="sprite mr-1" :class="sprite"></i>
        <span>{{jinda}}</span>
      </div>
    </div>

    <!-- end of icons -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link class="py-2  d-flex" v-for="(news, i) in category.newsList" :key="i"
        tag="div" :to="`/articles/${news._id}`"
        ><!--将原本的div换成router-link使其能进行跳转 添加tag使其变成div 因为router-link下为a标签 to为跳转链接-->
          <span class="text-grey-1">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.updatedAt | date}}</span><!--时间处理包dayjs-->
          <!-- npm i dayjs安装时间处理包 updatedAt 和 createdAt -->
        </router-link>
      </template>
    </m-list-card>


    <m-list-card  icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 pt-0 text-center" v-for="(hero, i) in category.heroList" :key="i" style="width: 20%">
            <img :src="hero.avatar" alt="" class="w-100">
            <div class="fs-sm">{{hero.name}}</div>
          </router-link>
        </div>   
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频"></m-card>

    <m-card icon="menu1" title="图文攻略"></m-card>

  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')//表示转化为两位数的月份和日期
    }
  },
  data() {
    return {
      flag: true,
      v: null,
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
        autoplay: { delay: 2000 }, //实现轮播
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    zhankai() {
      this.flag=!this.flag
    },
    async fetchNewsCats() {
      const res =await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res =await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  computed: {
    sprite() {
      if (this.flag === true) {
        return "sprite-arrow"
      } else {
        return "sprite-arrow-1"
      }
    },
    jinda() {
      if (this.flag === true) {
        return '展开'
      } else {
        return '收起'
      }
    }
  },
};
</script>

<style lang='scss'>
@import "../assets/scss/variables";
.activ {
  display: none;
}
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1; //默认有透明度 使其不透明以显示白色
    border-radius: 0.1538rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: #4b67af;
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      //决定第几个无边框
      border-right: none;
    }
  }
}
</style>

