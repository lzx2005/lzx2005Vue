<template>
  <div>
    <!--<img src="./image/custom_menu2x.png" width="100%"/>-->
    <h2 class="title-h2">项目列表</h2>
    <div class="spin-container" v-if="spinShow">
      <Spin size="large" fix></Spin>
      从Github读取数据...
    </div>
    <template>
      <Row :gutter="24">
        <i-col span="12" v-for="repo of repos" :key="repo.id">
          <div>
            <Card class="repo-card">
              <p slot="title">{{repo.name}}</p>
              <p slot="extra">
                <Tag color="blue" v-if="repo.language">{{repo.language}}</Tag>
                <Tag color="default" v-else>未指定语言</Tag>
              </p>
              <Poptip trigger="hover" title="详细描述" :content="repo.description" placement="bottom">
                <p class="desc-p" v-if="repo.description">{{repo.description}}</p>
                <p class="desc-p" v-else>No description</p>
              </Poptip>
            </Card>
          </div>
        </i-col>
      </Row>
    </template>
    <BackTop></BackTop>
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
            'affiliation': 'owner'
          },
          headers: {
            'Authorization': 'bearer ' + token
          }
        };
        this.$http.get('/github/user/repos', obj).then((response) => {
          console.log(response.body);
          let array = [];
          for (let i = 0; i < 10; i++) {
            array.push(response.body[i]);
          }
          this.repos = array;
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
  .title-h2
    margin-bottom 10px
  .spin-container
    display: inline-block;
    width: 100%;
    height: 100px;
    position: relative;
    border: 0px solid #eee;
    text-align center;
  .repo-card
    width 100%
    margin-bottom 25px;
    .desc-p
      overflow hidden
      height 20px
</style>
