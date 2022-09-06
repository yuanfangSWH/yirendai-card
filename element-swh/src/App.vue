<template>
  <div id="app">
    <div class="navigation">
      <div class="n-logo">生活需要更简单的方式</div>
      <div class="n-to">
        <router-link to="/" class="n-to-a to-2">首页</router-link>
      </div>
      <div class="n-to">
        <router-link to="/collection" class="n-to-a to-2">图册收藏</router-link>
      </div>
      <div class="n-to">
        <router-link to="/xttz" class="n-to-a to-2">消息留言</router-link>
      </div>
      <div class="n-to">
        <router-link to="/center" class="n-to-a to-2">数据中心</router-link>
      </div>
    </div>
    <div class="bottom">
      <div class="b-il">
        <div class="b-dl-1">THE AUTHOR</div>
        <div class="b-dl-2">YUANFANG</div>
      </div>
    </div>
    <div class="Main-frame" id="frame">
      <div class="layer"></div>
    </div>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {};
</script>

