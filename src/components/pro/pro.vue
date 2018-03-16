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
        to: '4484de3309ae42dc1f50',
        ken: '88201d2c53f10c0c1279',
        spinShow: true
      };
    },
    methods: {
      getRepos () {
        let token = this.to + this.ken;
        this.spinShow = true;
        let obj = {
          params: {
            'sort': 'updated',
            'affiliation': 'owner',
            'visibility': 'public'
          },
          headers: {
            'Authorization': 'bearer ' + token
          }
        };
        this.$http.get('/github/users/lzx2005/repos', obj).then((response) => {
          console.log(response.body);
          this.repos = response.body;
          this.spinShow = false;
        }, (response) => {
          console.log(response);
          this.$Notice.error({
            title: '请求失败',
            desc: response ? response.body.message : '请求失败，请联系管理员crow2005@vip.qq.com'
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
