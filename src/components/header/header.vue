<template>
  <div class="header-main">
    <div class="avatar">
      <img src="./avatar.jpg" width="200" height="200"/>
    </div>
    <div class="name">John Lee</div>
    <div class="word">
      李正先，1994年出生，2017年大学本科毕业，Java程序员。<br/>曾就职于有数金服、小泰科技，
      喜爱但不限于Java、前端、Python、小程序、Android等相关知识，
      本网站主要负责记录本人的一些开发手记，以及展示个人简历。
      网站本身也集成了自己所能搭建的最好的技术。
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
    padding-top 200px
    width 50%
    margin 0px auto
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
