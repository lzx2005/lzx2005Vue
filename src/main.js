// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';
import plugins from './plugins';
import filter from './filters';
import VueMarkdown from 'vue-markdown';
import prismjs from '../static/prism';

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(plugins);
Vue.use(filter);
Vue.use(prismjs);
Vue.directive('highlight', {
  // 当被绑定的元素插入到 DOM 中时……
  mounted: function (el) {
    let blocks = el.querySelectorAll('pre code');
    console.log(blocks);
    blocks.forEach((block) => {
      prismjs.highlightElement(block);
    });
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filter,
  VueMarkdown,
  prismjs,
  components: {App},
  template: '<App/>'
});
