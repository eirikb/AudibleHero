import 'babel-polyfill';
import Vue from 'vue'
import store from './store'
import router from './router'

const req = require.context('./components/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key))
});

console.log('Go!');
localStorage.clear();
// import {loadLibrary} from './api';
// loadLibrary().then(books => console.log('books', books));

import {loadAuthor} from './api';
loadAuthor('Brandon Sanderson').then(books => console.log('res books', books));

/*
 new Vue({
 el: '#app',
 store,
 router
 });
 */
