import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import router from './router';

Vue.use(VueAnalytics, {
  id: 'UA-69263799-2',
  router,
  autoTracking: {
    exception: true
  }
});
