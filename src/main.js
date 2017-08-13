import 'babel-polyfill';
import Vue from 'vue';
import store from './store';
import router from './router';

const req = require.context('./components/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key))
});

Vue.directive('lazy', {
  bind(el) {
    const src = el.src;

    el.src = '';
    el.__onScroll__ = () => {
      const rect = el.getBoundingClientRect();
      const height = el.height;

      const elementIsVisible = rect.top + height >= 0 && rect.bottom - height <= window.innerHeight;

      if (elementIsVisible) {
        el.src = src;
      }
    };
    document.addEventListener('scroll', el.__onScroll__);
  },

  inserted(el) {
    el.__onScroll__();
  },

  unbind(el) {
    document.removeEventListener('scroll', el.__onScroll__);
  }
});


new Vue({
  el: '#app',
  store,
  router
});
