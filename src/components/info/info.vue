<template>
  <div>
    <div class="spin-container" v-if="spinShow">
      <Spin size="large" fix></Spin>
    </div>
    <transition-group name="slide-fade">
      <div class="info-div" v-for="blog of blogs" :key="blog.blogId" @click="getBlog(blog.blogId)">
        <Card class="card">
          <p slot="title">{{blog.title}}</p>
          <p slot="extra">
            <Tag color="blue" v-if="blog.tag">{{blog.tag}}</Tag>
            <Tag color="default" v-else>未指定标签</Tag>
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
                ：{{blog.createTime | formatDate}}
              </div>
            </Tooltip>
          </div>
        </Card>
      </div>
    </transition-group>
    <BackTop></BackTop>
    <div class="button-div">
      <div class="button-item" v-if="hasPrevPage">
        <Button type="primary" @click="getPrevPage" :loading="buttonLoading">
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
        <Button type="primary" @click="getNextPage" :loading="buttonLoading">
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

    <Modal
      v-model="blogModal"
      width="60%"
      :styles="{top: '20px',button:'20px'}">
      <div class="blog-info">
        <div class="blog-info-title">{{blog.title}}</div>
        <div class="blog-info-desc">
          <div class="blog-info-desc-item">
            <Icon type="person" size="30"></Icon>
            <div>{{blog.author}}</div>
          </div>
          <div class="blog-info-desc-item">
            <Icon type="eye" size="30"></Icon>
            <div>{{blog.view}}</div>
          </div>
          <div class="blog-info-desc-item">
            <Icon type="ios-timer" size="30"></Icon>
            <div>{{blog.createTime | formatDate}}</div>
          </div>
        </div>
      </div>
      <div class="spin-container" v-if="blogSpinShow">
        <Spin size="large" fix></Spin>
      </div>
      <VueMarkdown :source="blog.content" :anchor-attributes="anchorAttrs" v-highlight @rendered="rendered"></VueMarkdown>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {dateFilter} from '../../filters/date.js';
  import VueMarkdown from 'vue-markdown';
  import prismjs from '../../../static/prism';

  export default {
    components: {
      VueMarkdown
    },
    data () {
      return {
        blogs: [],
        spinShow: true,
        blogSpinShow: true,
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
        buttonLoading: false,
        blogModal: false,
        blog: {},
        anchorAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow'
        }
      };
    },
    filters: {
      formatDate (time) {
        return dateFilter(time);
      }
    },
    methods: {
      getBlogs (page) {
        let obj = {
          params: {
            page: 1,
            pageSize: 10
          }
        };
        // 清空当前列表
        this.blogs = [];
        // 打开加载条显示
        this.spinShow = true;
        // Lambda写法
        this.$http.get('/iapi/blog/list', obj).then((response) => {
          // 响应成功回调
          this.spinShow = false;
          this.blogs = response.body.list;
          let resultSize = response.body.size;
          let pageSize = response.body.pageSize;
          this.hasNextPage = resultSize >= pageSize;
          this.page = response.body.pageNum;
          this.hasPrevPage = this.page > 1;
          this.buttonLoading = false;
        }, (response) => {
          this.spinShow = false;
          this.$Notice.error({
            title: '请求失败',
            desc: response ? response.msg : '请求失败，请联系管理员crow2005@vip.qq.com'
          });
          this.buttonLoading = false;
        });
      },
      getPrevPage () {
        this.buttonLoading = true;
        let page = this.page;
        if (page > 1) {
          this.getBlogs(page - 1);
        }
      },
      getNextPage () {
        this.buttonLoading = true;
        let page = this.page;
        this.getBlogs(page + 1);
      },
      getBlog (id) {
        this.blog = {};
        this.blogSpinShow = true;
        this.blogModal = true;
        this.$http.get('/iapi/blog/' + id, {}).then((response) => {
          let blog = response.body.data;
          this.blogSpinShow = false;
          console.log(blog);
          if (blog) {
            this.blog = blog;
            this.$nextTick(function () {
              let el = this.$children[4].$el;
              let blocks = el.querySelectorAll('pre code');
              blocks.forEach((block) => {
                prismjs.highlightElement(block);
              });
            });
          } else {
            this.$Notice.error({
              title: '请求失败',
              desc: blog.msg
            });
          }
        }, (response) => {
          this.$Notice.error({
            title: '请求失败',
            desc: response ? response.msg : '请求失败，请联系管理员crow2005@vip.qq.com'
          });
        });
      },
      rendered () {
      }
    },
    created () {
      this.getBlogs(this.page);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../static/prism.css"
  .spin-container
    display: inline-block;
    width: 100%;
    height: 100px;
    position: relative;
    border: 0px solid #eee;

  .info-div
    margin-bottom 20px
    transform all 1s
    .card
      .card-footer
        padding-top 10px
        div
          display block

  .slide-fade-enter-active
    transition: all .7s;

  .button-div
    display flex;
    .button-item
      flex 1;
    .button-pull-right
      text-align right;

  .vertical-center-modal
    display flex;
    align-items center;
    justify-content center;
    .ivu-modal
      top 0;

  .ivu-modal-body
    padding 0px 80px 20px 80px;
    font-size 16px;
    line-height 1;
    div
      overflow scroll;
      -webkit-overflow-scrolling touch;
      -moz-overflow-scrolling touch;
      -o-overflow-scrolling touch;
    .blog-info
      width 100%;
      padding 50px 0px;
      .blog-info-title
        text-align center;
        width 100%;
        font-size 40px;
        padding 20px 0px;
      .blog-info-desc
        width 100%;
        display flex;
        .blog-info-desc-item
          flex 1;
          text-align center;
    h1
      margin 15px 0px;
      font-size 35px;
    h2
      margin 15px 0px;
      font-size 32px;
    h3
      margin 15px 0px;
      font-size 27px;
    h4
      margin 15px 0px;
      font-size 23px;
    h5
      margin 15px 0px;
      font-size 20px;
    p
      margin 10px 0px;
      line-height 20px;
      color black;
    hr
      color #f1f1f1;
      border none;
      height 1px;
      border-top 1px solid #f1f1f1;
      margin-top 20px
      margin-bottom 20px
    pre
      line-height 20px;
      font-size 12px;
      word-break break-all;
      word-wrap break-word;
    img
      margin 10px 0px;
      max-width 100%;
    ul
      line-height 20px;
      list-style disc;
      li
        list-style-type disc;
    ol
      line-height 20px;
      list-style disc;
      li
        list-style-type disc;
    strong
      color #151515;
    blockquote
      margin 10px 0px;
      padding 10px;
      background-color rgba(255, 153, 0, 0.15);
      border-left 5px solid rgba(255, 153, 0, 0.50);
</style>
