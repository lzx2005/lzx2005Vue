<template>
  <div>
    <div class="info-div" v-for="blog of blogs" :key="blog.blog_id">
      <Card class="card">
        <p slot="title">{{blog.title}}</p>
        <p slot="extra"><Tag color="blue">Java</Tag></p>
        <p>{{blog.description}}</p>
        <div class="card-footer">
          <Tooltip content="作者" placement="left">
            <div><Icon type="person"></Icon> ：{{blog.author}}</div>
          </Tooltip>
          <Tooltip content="浏览量" placement="left">
            <div><Icon type="eye"></Icon> ：{{blog.view}}</div>
          </Tooltip>
          <Tooltip content="发布时间" placement="left">
            <div><Icon type="ios-timer"></Icon> ：{{blog.create_time}}</div>
          </Tooltip>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        blogs: []
      };
    },
    methods: {
      getBlogs () {
        // Lambda写法
        this.$http.get('/iapi/blogs/1', {}).then((response) => {
          // 响应成功回调
          console.log(response);
          this.blogs = response.body.data;
        }, (response) => {
          console.log(2);
        });
      }
    },
    created () {
      this.getBlogs();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .info-div
    margin-bottom 20px
    .card
      .card-footer
        padding-top 10px
        div
          display block

</style>
