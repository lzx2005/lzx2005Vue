// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';
import plugins from './plugins';

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(plugins);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
