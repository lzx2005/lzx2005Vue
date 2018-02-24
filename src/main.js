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

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(plugins);
Vue.use(filter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filter,
  VueMarkdown,
  components: { App },
  template: '<App/>'
});
