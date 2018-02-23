<template>
  <div>
    <div class="spin-container" v-if="spinShow">
      <Spin size="large" fix></Spin>
    </div>
    <transition-group name="slide-fade">
      <div class="info-div" v-for="blog of blogs" :key="blog.blog_id">
        <Card class="card">
          <p slot="title">{{blog.title}}</p>
          <p slot="extra">
            <Tag color="blue">Java</Tag>
          </p>
          <p>{{blog.description}}</p>
          <div class="card-footer">
            <Tooltip content="作者" placement="left">
              <div>
                <Icon type="person"></Icon>
                ：{{blog.author}}
              </div>
            </Tooltip>
            <Tooltip content="浏览量" placement="left">
              <div>
                <Icon type="eye"></Icon>
                ：{{blog.view}}
              </div>
            </Tooltip>
            <Tooltip content="发布时间" placement="left">
              <div>
                <Icon type="ios-timer"></Icon>
                ：{{blog.create_time | formatDate}}
              </div>
            </Tooltip>
          </div>
        </Card>
      </div>
    </transition-group>
    <BackTop></BackTop>
    <div class="button-div">
      <div class="button-item" v-if="hasPrevPage">
        <Button type="primary" @click="getPrevPage">
          <Icon type="chevron-left"></Icon>
          上一页
        </Button>
      </div>
      <div class="button-item" v-else>
        <Button type="primary" disabled>
          <Icon type="chevron-left"></Icon>
          上一页
        </Button>
      </div>
      <div class="button-item button-pull-right" v-if="hasNextPage">
        <Button type="primary" @click="getNextPage">
          下一页
          <Icon type="chevron-right"></Icon>
        </Button>
      </div>
      <div class="button-item button-pull-right" v-else>
        <Button type="primary" disabled>
          下一页
          <Icon type="chevron-right"></Icon>
        </Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {dateFilter} from '../../filters/date.js';

  export default {
    data () {
      return {
        blogs: [],
        spinShow: true,
        page: 1,
        hasNextPage: true,
        hasPrevPage: true
      };
    },
    filters: {
      formatDate (time) {
        return dateFilter(time);
      }
    },
    methods: {
      getBlogs (page) {
        // 清空当前列表
        this.blogs = [];
        // 打开加载条显示
        this.spinShow = true;
        // Lambda写法
        this.$http.get('/iapi/blogs/' + page, {}).then((response) => {
          // 响应成功回调
          this.spinShow = false;
          this.blogs = response.body.data;
          let resultSize = response.body.data.length;
          let pageSize = response.body.info.pageSize;
          if (resultSize < pageSize) {
            // 没有下一页
            this.hasNextPage = false;
          } else {
            this.hasNextPage = true;
          }
          this.page = response.body.info.page;
          if (this.page <= 1) {
            this.hasPrevPage = false;
          } else {
            this.hasPrevPage = true;
          }
        }, (response) => {
          this.spinShow = false;
          this.$Notice.error({
            title: '请求失败',
            desc: response ? response.msg : '请求失败，请联系管理员crow2005@vip.qq.com'
          });
        });
      },
      getPrevPage () {
        let page = this.page;
        if (page > 1) {
          this.getBlogs(page - 1);
        }
      },
      getNextPage () {
        let page = this.page;
        this.getBlogs(page + 1);
      }
      // shuffle: function () {
      //   this.items = _.shuffle(this.items);
      // }
    },
    created () {
      this.getBlogs(this.page);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .spin-container
    display: inline-block;
    width: 100%;
    height: 100px;
    position: relative;
    border: 0px solid #eee;
  .info-div
    margin-bottom 20px
    .card
      .card-footer
        padding-top 10px
        div
          display block
  .slide-fade-enter-active
    transition: all .7s;
  .slide-fade-leave-active
    position: absolute;
  .slide-fade-enter, .slide-fade-leave-to
    opacity: 0;
  .button-div
    display flex ;
    .button-item
      flex 1 ;
    .button-pull-right
      text-align right ;
</style>
