<template>
  <div class="header-main">
    <div class="avatar">
      <img src="./avatar3.jpg" width="200" height="200"/>
    </div>
    <div class="name">John Lee</div>
    <div class="word">
      1994年出生，2017年本科毕业，Java程序员。<br/>曾就职于有数金服、小泰科技，
      喜爱但不限于Java、前端、Python、小程序、Android等相关知识。<br/>本网站主要负责记录本人的一些开发手记，以及展示个人简历。
    </div>
    <v-soc></v-soc>
  </div>
</template>

<script type="text/ecmascript-6">
  import soc from '../soc/soc';
  export default {
    components: {
      'v-soc': soc
    },
    name: 'header'
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header-main
    padding-top 100px
    text-align center
    .avatar
      & > img
        border-radius 50%
    .name
      font-size 50px
      padding 20px
    .word
      font-size 12px
      color gray
      line-height 24px
</style>
