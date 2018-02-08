<template>
  <div id="app">
    <v-header></v-header>
    <div class="nav">
      <div class="nav-item"><router-link to="/info">基本信息</router-link></div>
      <div class="nav-item"><router-link to="/pro">作品展示</router-link></div>
      <div class="nav-item"><router-link to="/soc">社交网络</router-link></div>
      <div class="nav-item"><router-link to="/web">网站架构</router-link></div>
    </div>
    <router-view></router-view>
    <div class="content">这是详细信息</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';
  export default {
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .nav
      display flex
      height 50px
      line-height 50px
      width 50%
      margin 0px auto
      .nav-item
        flex 1
        text-align center
</style>
