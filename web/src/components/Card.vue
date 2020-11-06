<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-1">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true },
    plain: { type: Boolean },
  },
};
</script>

<style lang='scss'>
</style>