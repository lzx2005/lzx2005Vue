import {
  dateY2S,
  dateY2D,
  dateH2D
} from './dateformatter';

const install = (Vue, opt = {}) => {
  if (install.installed) return;
  Vue.prototype.$dateY2S = dateY2S;
  Vue.prototype.$dateY2D = dateY2D;
  Vue.prototype.$dateH2D = dateH2D;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
