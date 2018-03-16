<template>
    <div>
      <!--<img src="./image/custom_menu2x.png" width="100%"/>-->
      <div class="spin-container" v-if="spinShow">
        <Spin size="large" fix></Spin>
      </div>
      <template>
        <Row :gutter="24">
          <i-col span="12" v-for="repo of repos" :key="repo.id">
            <div>
              <Card class="repo-card">
                <p slot="title">{{repo.name}}</p>
                <p>Content of card</p>
                <p>Content of card</p>
                <p>Content of card</p>
              </Card>
            </div>
          </i-col>
        </Row>
      </template>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        repos: [],
        to: '0584aa735872752dc',
        ken: '6b04c9e0b557d7b65a492cb',
        spinShow: true
      };
    },
    methods: {
      getRepos () {
        this.spinShow = true;
        let obj = {
          params: {
            'sort': 'updated',
            'affiliation': 'owner',
            'visibility': 'public'
          },
          headers: {
            'Authorization': 'bearer 0584aa735872752dc6b04c9e0b557d7b65a492cb'
          }
        };
        this.$http.get('/github/users/lzx2005/repos', obj).then((response) => {
          console.log(response.body);
          this.repos = response.body;
          this.spinShow = false;
        }, (response) => {
          this.$Notice.error({
            title: '请求失败',
            desc: response ? response.msg : '请求失败，请联系管理员crow2005@vip.qq.com'
          });
          this.spinShow = false;
        });
      }
    },
    created () {
      this.getRepos();
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
  .repo-card
    width 100%
    margin-bottom 10px;
</style>
