<template>
  <m-card :icon="icon" :title="title">
    <div class="card-body pt-1">
      <a href="https://pvp.qq.com/web201605/herodetail/m/536.html">
        <img
          class="mb-25"
          src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20201009/8900984516264.jpg"
          alt=""
          :class="img"
        />
      </a>
      <div class="nav jc-between d-flex qwe pt-3">
        <div
          class="nav-item fs-sm"
          :class="{ active: active === i }"
          @click="$refs.list.swiper.slideTo(i)"
          v-for="(category, i) in categories"
          :key="i"
        >
          <!-- @click为根据点击的索引值滑动swiper -->
          <div class="nav-link">{{ category.name }}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper
          touch-action:
          none
          ref="list"
          @slide-change="() => (active = $refs.list.swiper.activeIndex)"
          :options="{ autoHeight: true }"
        >
          <!--touch-action防报错 后面为更新选中-->
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    img() {
      if (this.title === "英雄列表") {
        return "imgY";
      } else {
        return "imgN";
      }
    },
  },
};
</script>


<style lang='scss'>
@import "../assets/scss/_variables.scss";
.imgY {
  width: 100%;
}
.imgN {
  display: none;
}

.qwe {
  border-top: 1px solid $border-color;
}
</style>