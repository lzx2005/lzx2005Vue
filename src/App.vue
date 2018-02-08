<template>
  <div id="app">
    <v-header></v-header>
    <div class="nav">
      <div class="nav-item"><router-link to="/info">开发手记</router-link></div>
      <div class="nav-item"><router-link to="/pro">作品展示</router-link></div>
      <div class="nav-item"><router-link to="/resume">个人简历</router-link></div>
      <div class="nav-item"><router-link to="/web">网站日志</router-link></div>
    </div>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';
  import footer from './components/footer/footer';
  export default {
    components: {
      'v-header': header,
      'v-footer': footer
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 60%
    margin 0px auto
    .nav
      display flex
      height 50px
      line-height 50px
      margin-bottom 20px
      .nav-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77, 85, 93)
          &.active
            color #2d8cf0
</style>
