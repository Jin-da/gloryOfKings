<template>
  <div class="page-hero" v-if="model">
    <div class="topbar py-2 px-3 d-flex ai-center topnav text-white">
      <img src="../assets/logo.png" height="32" />
      <div class="px-2 flex-1">
        <!-- span为inline元素 不受dlex影响 -->
        <span class="text-white">王者荣耀</span>
        <span class="ml-2 fs-xs">攻略站</span>
      </div>
      <router-link to="/" tag="div" class="fs-xs">更多英雄 &gt; </router-link
      ><!--gt大于 lt小于-->
    </div>
    <!-- end of topbar -->
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-xs">{{ model.title }}</div>
        <strong class="my-1 fs-lg">{{ model.name }}</strong>
        <div class="fs-xs">
          {{ model.categories.map((v) => v.name).join("/") }}
        </div>
        <!--join将数组里的对象用/进行分割-->
        <div class="d-flex jc-between">
          <div class="scores fs-sm d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-blackyellow">{{
              model.scores.difficult
            }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link tag="span" class="text-grey fs-xs" to="/">
            皮肤: 2 &gt;
          </router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->

    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link fs-sm">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link fs-sm">进阶攻略</div>
          </div>
        </div>
      </div>

      <swiper>
        <swiper-slide>
          <div>
            <div class="px-3 py-2 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu1"></i>
                  一图识英雄
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4">
                <!-- 图标 -->
                <div class="d-flex jc-around">
                  <img
                    @click="currentSkillIndex = i"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                    width="60"
                    height="60"
                    class="icon"
                    :class="{ active: currentSkillIndex === i }"
                  />
                </div>

                <!-- 技能名称 -->
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-2">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-grey-1 ml-4">
                      (冷却值: {{ currentSkill.delay }} 消耗:
                      {{ currentSkill.cost }}
                      )
                    </span>
                  </div>
                  <p>{{ currentSkill.description }}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1 fs-sm">
                    小提示: {{ currentSkill.tips }}
                  </p>
                </div>
              </div>
            </div>

            <m-card plain icon='menu1' title="出装推荐" class="hero-items">
              <div class="fs-md">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-md mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>

            <m-card plain icon='menu1' title="使用技巧">
              <p class="fs-sm mt-0">{{model.usageTips}}</p>
            </m-card>

            <m-card plain icon='menu1' title="对抗技巧">
              <p class="fs-sm mt-0">{{model.battleTips}}</p>
            </m-card>

            <m-card plain icon='menu1' title="团战思路">
              <p class="fs-sm mt-0">{{model.teamTips}}</p>
            </m-card>

            <m-card plain icon='menu1' title="英雄关系">
              <div class="fs-md">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex py-2">
                <img :src="item.hero.avatar" alt="" height="50">
                <div class="flex-1 ml-3 fs-sm">{{item.description}}</div>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
          
        </swiper-slide>

        <swiper-slide> </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`); //!!this 不是hero
      this.model = res.data;
    },
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); //渐变效果
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block; //设置宽高 所以inline-block
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

  .skills {
    img.icon {
      border: 3px solid map-get($colors, "white");
      &.active {
        border-color: map-get($colors, "primary");
      }
      border-radius: 45%;
    }
  }

  .hero-items {
    img.icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>