import Vue from 'vue';
import Router from 'vue-router';
import info from '../components/info/info';
import pro from '../components/pro/pro';
import soc from '../components/soc/soc';
import web from '../components/web/web';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/info', component: info },
    { path: '/pro', component: pro },
    { path: '/soc', component: soc },
    { path: '/web', component: web }
  ]
});
