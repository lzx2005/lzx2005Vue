import Vue from 'vue';

import {
  dateFilter
} from './date';

export default Vue.filter('moment', dateFilter);
