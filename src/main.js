import 'babel-polyfill';
import Vue from 'vue';
import store from './store';
import router from './router';
import './lazy';

const req = require.context('./components/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key))
});

new Vue({
  el: '#app',
  store,
  router
});
